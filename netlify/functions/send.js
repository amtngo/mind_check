import { Resend } from "resend";

export const handler = async (event) => {
  try {
    const { code, answers } = JSON.parse(event.body);

    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/codes?code=eq.${code}`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    const data = await res.json();

    if (!data || data.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "코드 없음" })
      };
    }

    // ❗ 이미 사용된 코드 차단
    if (data[0].used) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "이미 사용된 코드" })
      };
    }

    const email = data[0].email;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "상담 결과",
      html: `<h2>응답 결과</h2><pre>${JSON.stringify(answers, null, 2)}</pre>`
    });

    // ❗ 메일 실패 체크
    if (!result || result.error) {
      throw new Error("메일 전송 실패");
    }

    // ❗ 사용 처리
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/codes?code=eq.${code}`, {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ used: true })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
