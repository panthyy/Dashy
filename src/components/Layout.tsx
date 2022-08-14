import "../styles/global.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className=" w-full h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Astro</title>
      </head>

      <body className=" bg-center bg-cover flex  w-full h-full dark:bg-primary-dark dark:text-primary-light ">
        {children}
      </body>
    </html>
  );
};
