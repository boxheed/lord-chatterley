import {matcher, isMatch} from 'matcher';

class MiddlewareFilter {

    constructor(pattern, delegateFunction) {
        this.delegateFunction = delegateFunction;
        this.pattern = pattern;
        this.onRequest = this.onRequest.bind(this);
    }

    async onRequest(context, next) {
        if(isMatch(context.url.pathname, this.pattern)) {
            return this.delegateFunction(context, next);
        }
        return await next();
    }

}

export { MiddlewareFilter }