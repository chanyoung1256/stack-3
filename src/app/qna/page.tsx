"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("qna").select("*"); // 'qna'는 실제 테이블 이름으로 변경
      if (error) console.error("Error:", error);
      else setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>DB Data:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.question}</li>
        ))}
      </ul>
    </div>
  );
}
