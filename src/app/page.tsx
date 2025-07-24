"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 네비게이션 링크용

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    checkSession();

    // 실시간 세션 변화 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    // 로그인 안 된 경우: 랜딩 페이지 표시
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">환영합니다, Clabot!</h1>
        <p className="text-lg mb-8">AI 기반 스마트 학업 공간 플랫폼</p>
        <Link href="/auth" className="bg-blue-500 text-white px-6 py-3 rounded">
          로그인 / 회원가입
        </Link>
      </div>
    );
  }

  // 로그인 된 경우: 대시보드 표시
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between">
          <h1 className="text-2xl">Clabot Dashboard</h1>
          <div>
            <Link href="/qna" className="mr-4">
              Q&A
            </Link>
            <Link href="/calendar" className="mr-4">
              캘린더
            </Link>
            <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
          </div>
        </nav>
      </header>

      <main className="p-8">
        <section className="mb-8">
          <h2 className="text-2xl mb-4">최근 AI 튜터 요약</h2>
          <p>AI가 분석한 최근 수업 요점: [여기서 AI API 호출 결과 표시]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">오늘의 캘린더</h2>
          <div>[react-big-calendar 컴포넌트나 간단 테이블로 미리보기]</div>
        </section>

        <section>
          <h2 className="text-2xl mb-4">빠른 액션</h2>
          <ul className="grid grid-cols-3 gap-4">
            <li className="bg-white p-4 rounded shadow">새 퀴즈 생성</li>
            <li className="bg-white p-4 rounded shadow">참여 분석 보기</li>
            <li className="bg-white p-4 rounded shadow">감정 피드백</li>
          </ul>
        </section>
      </main>

      <footer className="text-center p-4 bg-gray-200">
        © 2025 Clabot. All rights reserved.
      </footer>
    </div>
  );
}
