declare namespace Lucia {
  type Auth = import ("./lucia.ts").Auth;
  type DatabaseUserAttributes = {
    userName : string,
    mailAddress : string,
  };
  type DatabaseSessionAttributes = {};
}