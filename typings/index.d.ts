import * as Koa from 'koa';

declare interface ThinkBaseContext extends Koa.Context {
  request: ThinkReqeust
  response: ThinkResponse

  readonly userAgent: string
  readonly isGet: boolean
  readonly isPost: boolean
  readonly isCli: boolean

  referer(onlyHost: boolean): string
  referrer(onlyHost: boolean): string
  isMethod(method: string): boolean
  isAjax(method: string): boolean
  isJsonp(callbackField: string): boolean
  jsonp(data: any, callbackField: string): false
  json(data: any): false
  success(data: any, message: string): false
  fail(errno: number, errmsg: string, data: any): false
  expires(time: number): undefined
  config(name: string, value?: any, m?: string): any
  post(name?: any, value?: any): any
  file(name?: any, value?: any): any
  cookie(name: string): string;
  cookie(name: string, value: null, options?: object): void;
  cookie(name: string, value: string, options?: object): void;
  service(name: string, m?: string, ...args: string[]): any
  download(filepath: string, filename?: string): false
}
declare interface ThinkLogger {
  debug(message: any): void
  info(message: any): void
  warn(message: any): void
  error(message: any): void
  trace(message: any): void
}

declare global {
  interface ThinkReqeust extends Koa.Request{}
  interface ThinkResponse extends Koa.Response {}
  interface ThinkContext extends ThinkBaseContext {
    new(): ThinkContext;
    readonly module: string
    readonly controller: string
    readonly action: string
    param(name?: any, value?: any, m?: string): any
  }
  interface ThinkController extends ThinkBaseContext {
    new(ctx: ThinkContext): ThinkController
    ctx: ThinkContext;
    body: any
    status: number
    type: string
    readonly ip: string
    readonly ips: string[]
    readonly method: string

    get(name?: any, value?: any, m?: string): any
    query(name?: any, value?: any, m?: string): any
    header(name: string): string
    header(name: string, value?: string): undefined
    redirect(url: string, alt: string): any
    controller(name: string, m?: string): any
    action(controller: string|Object, name: string, m?: string): any
  }
  interface ThinkLogic extends ThinkController {
    new(ctx: ThinkContext): ThinkController
    allowMethods: string
    rules: Object
    validateErrors?: Object
    validate(rules: Object, msgs?: Object): Object
  }
  interface ThinkService {
    new(...arg: any[]): ThinkService
  }
  interface ThinkApplication extends Koa {
    modules: string[]
    controllers: any[]
    logics: any[]
    models: any[]
    services: any[]
    routers: any
    validators: any
    server: any
  }

  interface Think {
    app: ThinkApplication
    ROOT_PATH: string
    APP_PATH: string
    env: string
    version: string
    messenger: any
    logger: ThinkLogger
    config(name: string, value?: any, module?: string): any
    service(name: string, m?: string, ...args: string[]): any
    beforeStartServer(fn: any): Promise<any[]>

    Controller: ThinkController
    Logic: ThinkLogic
    Service: ThinkService
  }
  const think: Think;
}

declare class Application {
  constructor(arg: Object)
  run(): void
}

export = Application;

