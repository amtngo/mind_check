const { Resend } = require("resend");

exports.handler = async function(event) {
  try {
    const { answers } = JSON.parse(event.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "amtngo@naver.com",
      subject: "테스트 메일",
      html: `<pre>${JSON.stringify(answers, null, 2)}</pre>`
    });

    return {
      statusCode: 200,
      body: "메일 전송 성공"
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
