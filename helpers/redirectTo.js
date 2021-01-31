export const redirectTo = (ctx, Location) => {
  ctx.res.writeHead(301, { Location });
  ctx.res.end();
}