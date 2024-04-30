async function log({ locals, request }, next) {
    console.log("logging request");
    const response = await next();
    console.log("logging response");
    return response;
}

export { log };