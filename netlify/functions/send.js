const { Resend } = require("resend");

exports.handler = async function(event) {

  try {

    const { code, answers } = JSON.parse(event.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "amtngo@naver.com",
      subject: "설문 결과",
      html: `
        <h3>코드: ${code}</h3>
        <pre>${JSON.stringify(answers, null, 2)}</pre>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
