import requests
from bs4 import BeautifulSoup
import hashlib
import os
from datetime import datetime

# ── 설정 ──────────────────────────────────────
# GitHub Secrets에서 불러옴 (코드에 직접 쓰면 안 됨)
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# 모니터링할 대사관 페이지 목록
TARGETS = [
    {
        "country": "indonesia",
        "url": "https://overseas.mofa.go.kr/id-ko/brd/m_3246/list.do",
        "name": "주인도네시아 한국대사관"
    },
    {
        "country": "vietnam",
        "url": "https://overseas.mofa.go.kr/vn-ko/brd/m_3249/list.do",
        "name": "주베트남 한국대사관"
    },
    {
        "country": "philippines",
        "url": "https://overseas.mofa.go.kr/ph-ko/brd/m_3253/list.do",
        "name": "주필리핀 한국대사관"
    },
    {
        "country": "thailand",
        "url": "https://overseas.mofa.go.kr/th-ko/brd/m_3264/list.do",
        "name": "주태국 한국대사관"
    },
    {
        "country": "japan",
        "url": "https://overseas.mofa.go.kr/jp-ko/brd/m_3244/list.do",
        "name": "주일본 한국대사관"
    },
]


# ── 크롤링 함수 ───────────────────────────────
def crawl_page(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text(separator=' ', strip=True)
    except Exception as e:
        print(f"크롤링 오류 ({url}): {e}")
        return None


# ── 해시 함수 ─────────────────────────────────
def get_hash(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()


# ── Supabase 저장 함수 ────────────────────────
def get_previous_hash(country):
    """Supabase에서 이전 해시값 불러오기"""
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/crawl_logs?country=eq.{country}&order=checked_at.desc&limit=1",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
        )
        data = response.json()
        if data:
            return data[0].get('page_hash')
    except:
        pass
    return None


def save_log(country, status, details, page_hash):
    """크롤링 결과 Supabase에 저장"""
    try:
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/crawl_logs",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "country": country,
                "status": status,
                "details": details,
                "page_hash": page_hash,
                "checked_at": datetime.now().isoformat()
            }
        )
        if response.status_code == 201:
            print(f"  ✓ 저장 완료")
        else:
            print(f"  ✗ 저장 실패: {response.text}")
    except Exception as e:
        print(f"  저장 오류: {e}")


def mark_change_detected(country, details):
    """documents 테이블에 변경 감지 표시"""
    try:
        requests.patch(
            f"{SUPABASE_URL}/rest/v1/documents?country_b=eq.{country}",
            headers={
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "change_detected": True,
                "change_details": details,
                "last_updated": datetime.now().isoformat()
            }
        )
        print(f"  ⚠️ 변경 감지 표시 완료")
    except Exception as e:
        print(f"  업데이트 오류: {e}")


# ── 메인 실행 ─────────────────────────────────
def main():
    print(f"크롤링 시작: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    for target in TARGETS:
        country = target['country']
        name    = target['name']

        print(f"\n▶ {name} 확인 중...")

        # 크롤링
        text = crawl_page(target['url'])
        if not text:
            continue

        # 해시 비교
        new_hash  = get_hash(text)
        prev_hash = get_previous_hash(country)

        if prev_hash is None:
            print(f"  ✓ 기준값 저장 (첫 실행)")
            save_log(country, "기준값저장", "최초 크롤링", new_hash)

        elif new_hash == prev_hash:
            print(f"  ✓ 변경없음")
            save_log(country, "변경없음", "", new_hash)

        else:
            print(f"  ⚠️ 변경 감지!")
            save_log(country, "변경감지", "페이지 내용 변경됨 — 담당자 확인 필요", new_hash)
            mark_change_detected(country, "페이지 내용 변경됨 — 담당자 확인 필요")

    print(f"\n완료: {datetime.now().strftime('%Y-%m-%d %H:%M')}")


if __name__ == "__main__":
    main()
