const Fonts = () => {
  return (
    <>
      <link href="/fonts/Roboto-Light.ttf" rel="preload" as="font" crossOrigin="anonymous"/>
      <link href="/fonts/Roboto-Medium.ttf" rel="preload" as="font" crossOrigin="anonymous"/>
      <link href="/fonts/Roboto-Regular.ttf" rel="preload" as="font" crossOrigin="anonymous"/>
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Roboto';
            src: url('/fonts/Roboto-Light.eot');
            src: local('Roboto-Light'),
              url('/fonts/Roboto-Light.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Roboto-Light.woff2') format('woff2'),
              url('/fonts/Roboto-Light.woff') format('woff'),
              url('/fonts/Roboto-Light.ttf') format('truetype'),
              url('/fonts/Roboto-Light.svg#Antonio-Bold') format('svg');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Roboto';
            src: url('/fonts/Roboto-Medium.eot');
            src: local('Roboto-Medium'),
              url('/fonts/Roboto-Medium.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Roboto-Medium.woff2') format('woff2'),
              url('/fonts/Roboto-Medium.woff') format('woff'),
              url('/fonts/Roboto-Medium.ttf') format('truetype'),
              url('/fonts/Roboto-Medium.svg#Antonio-Bold') format('svg');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Roboto';
            src: url('/fonts/Roboto-Regular.eot');
            src: local('Roboto-Regular'),
              url('/fonts/Roboto-Regular.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Roboto-Regular.woff2') format('woff2'),
              url('/fonts/Roboto-Regular.woff') format('woff'),
              url('/fonts/Roboto-Regular.ttf') format('truetype'),
              url('/fonts/Roboto-Regular.svg#Antonio-Bold') format('svg');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
        `
      }}/>
    </>
  )
}

export default Fonts;