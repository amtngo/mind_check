const { Resend } = require("resend");

exports.handler = async function(event) {

  // 0. POST 체크
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "POST 요청만 허용" })
    };
  }

  try {

    const body = JSON.parse(event.body);
    const { code, answers, scores } = body;

    // 1. 입력값 검증
    if (!code || !answers || !scores) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "필수 데이터 누락" })
      };
    }

    // 2. 코드 조회
    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/codes?code=eq.${code}`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    );

    const data = await res.json();

    // 3. 코드 없음
    if (!data || data.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "유효하지 않은 코드" })
      };
    }

    const row = data[0];

    // 4. 이미 사용된 코드
    if (row.used === true) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "이미 사용된 코드" })
      };
    }

    const email = row.email;

    // 5. 메일 내용 생성
    const answerHtml = answers.map((a, i) => {
      return `
        <div style="margin-bottom:12px;">
          <strong>${i+1}. ${a.question}</strong><br/>
          → ${a.selected}
        </div>
      `;
    }).join("");

    const scoreHtml = `
      <h3>그룹 점수</h3>
      <ul>
        <li>1그룹: ${scores[0]}</li>
        <li>2그룹: ${scores[1]}</li>
        <li>3그룹: ${scores[2]}</li>
        <li>4그룹: ${scores[3]}</li>
      </ul>
    `;

    // 6. 메일 전송
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "MindCheck <onboarding@resend.dev>",
      to: email,
      subject: `[내담자 응답 접수] 코드 ${code}`,
      html: `
        <h2>내담자 응답 결과</h2>
        <p><strong>코드:</strong> ${code}</p>
        <hr/>
        ${answerHtml}
        <hr/>
        ${scoreHtml}
      `
    });

    // 7. 메일 실패 체크
    if (!result || result.error) {
      console.error("메일 실패:", result);

      return {
        statusCode: 500,
        body: JSON.stringify({ error: "메일 전송 실패" })
      };
    }

    // 8. 코드 사용 처리
    await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/codes?code=eq.${code}`,
      {
        method: "PATCH",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          used: true,
          used_at: new Date().toISOString()
        })
      }
    );

    // 9. 성공 응답
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {

    console.error("서버 에러:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "서버 처리 중 오류 발생"
      })
    };
  }
};
