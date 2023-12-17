import { triggerEmail } from "./ses-service.js";
import mjml2html from "mjml";
import * as ejs from "ejs";

export const sendVerificationEmail = async (
  to,
  customerName,
  productName,
  productImage
) => {
  const mjmlObject = mjml2html(`
  <mjml>
  <mj-head>

    <mj-style>

      .body{
      align:center;
      background-color: rgba(242,242,242,1)!important;
      }

      .wrapper{
      background-color: #FFFFFF;
      padding: 0px 20px 0px 20px;
      }

      .footer-wrapper{
      background-color: #1A1A1A;
      padding: 0px 20px 0px 20px;
      }

      .post-wrapper{
      background-color: #FFFFFF;
      padding: 0px 20px 0px 20px;
      }

      .post {
      border-top: 1px solid #E8EDF3;
      border-left: 1px solid #E8EDF3;
      border-right: 1px solid #E8EDF3;
      border-radius:8px 8px 0px 0px;
      background-color:#F8FAFC;
      }

      .review-class {
      border-top: 1px solid #E8EDF3;
      border-left: 1px solid #E8EDF3;
      border-right: 1px solid #E8EDF3;
      border-radius:0px 0px 8px 8px;
      background-color:#F8FAFC;
      }


    </mj-style>
    <mj-attributes>
      <mj-body css-class="body" />
    </mj-attributes>
  </mj-head>

  <mj-body>
    <mj-wrapper css-class="wrapper">
      <mj-section text-align="center">
        <mj-column>
          <mj-text font-size="20px" line-height="18px" font-weight="600" color="#1A1A1A" padding="8px 0px 0px 0px">
            Feedback Farm</mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding="0px 0px 20px 0px">
        <mj-column>
          <mj-text padding="0px" font-size="16px" line-height="25px" color="#1A1A1A">
            Hello <%=customerName%>,
          </mj-text>
          <mj-text padding="10px 0px 0px 0px" font-size="16px" line-height="25px" color="#1A1A1A">
            Click on a star to rate your experience so far with:
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section css-class="post" padding="15px 18px 15px 18px">
        <mj-column>
          <mj-image src="<%=productImage%>" height="250px" padding="0px 0px 0px 0px" align="center" border="1px solid #B3B3B3" />
          <mj-text align="center" font-size="20px" padding="20px 0px 0px 0px" font-weight="500"><%=productName%></mj-text>
        </mj-column>
      </mj-section>
      <mj-section css-class="review-class" padding="15px 18px 15px 18px">
        <mj-group>
          <mj-column>
            <mj-text align="center" font-size="28px" font-weight="600"> ⭐️</mj-text>
            <mj-text align="center" font-size="16px" font-weight="400"> Terrible</mj-text>
          </mj-column>
          <mj-column>
            <mj-text align="center" font-size="28px" font-weight="600"> ⭐️</mj-text>
            <mj-text align="center" font-size="16px" font-weight="400"> Bad</mj-text>
          </mj-column>
          <mj-column>
            <mj-text align="center" font-size="28px" font-weight="600"> ⭐️</mj-text>
            <mj-text align="center" font-size="16px" font-weight="400"> Okay</mj-text>
          </mj-column>
          <mj-column>
            <mj-text align="center" font-size="28px" font-weight="600"> ⭐️</mj-text>
            <mj-text align="center" font-size="16px" font-weight="400"> Good</mj-text>
          </mj-column>
          <mj-column>
            <mj-text align="center" font-size="28px" font-weight="600"> ⭐️</mj-text>
            <mj-text align="center" font-size="16px" font-weight="400"> Great</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section padding="20px 0px 20px 0px">
        <mj-column>
          <mj-text padding="0px" font-size="16px" line-height="25px" color="#1A1A1A">
            Not happy? Please contact us first so we can help.


          </mj-text>
          <mj-text padding="10px 0px 0px 0px" font-size="16px" line-height="25px" color="#1A1A1A">
          Team at Feedback Farm.
          </mj-text>
          <mj-button color="#1A1A1A" padding="15px 0px 0px 0px" align="left">
            <text style="font-size:16px;">✉️</text><text style="font-weight:400; font-size:14px; color:#ffffff; padding-left:6px; align:center;">CONTACT US</text>
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>
    <mj-wrapper css-class="footer-wrapper">
      <mj-section padding="0px">
        <mj-column>
          <mj-text font-size="16px" font-weight="400" align="center" color="#E8EDF3" padding="0px" line-height="24px">
            You have received this email from Feedback Farm in response to your recent order at codedash.
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section padding="15px 0px 15px 0px">
        <mj-column>
          <mj-text align="center" color="#F8FAFC" line-height="19.07px" font-size="14px" padding="0px">
            <text style="color:#CCCCCC; font-weight:600">Contact us :</text> feedback-farm.myshopify.com
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section border-top="1px solid #E8EDF3" padding="0px 20px 0px 20px"></mj-section>
      <mj-section padding="15px 0px 0px 0px">
        <mj-column>
          <mj-text align="left" color="#F8FAFC" line-height="19.07px" font-size="14px" padding="0px">
            © Feedback Farm, 2023
          </mj-text>
        </mj-column>
        <mj-column>
          <mj-text align="right" color="#F8FAFC" line-height="19.07px" font-size="14px" padding="0px">
           Made with ❤️ Feedback Farm
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>
    `);

  const htmlString = ejs.render(mjmlObject.html, {
    customerName,
    productName,
    productImage,
  });

  await triggerEmail(
    "verify@dashpad.in",
    [to],
    `Hi, Welcome Email`,
    htmlString,
    "FARM"
  );
};
