//Core
import Document, { Html, Main } from 'next/document'

//Components
import {Fonts} from 'components';

//Other
import { NextHeadCustom, NextScriptCustom } from 'init/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const userAgent = ctx.req && ctx.req.headers['user-agent'];

    return {
      ...initialProps,
      userAgent
    };
  }


  render() {
    return (
      <Html>
        <NextHeadCustom/>
        <Fonts/>
        <body>
        <Main />
        <NextScriptCustom />
        </body>
      </Html>
    )
  }
}

export default MyDocument