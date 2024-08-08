"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const _ = require("lodash");
const angular_jwt_1 = require("@auth0/angular-jwt");
const token_dto_1 = require("../../../../Alchemi/Defender/libs/services/src/lib/token/dto/token.dto");
const clients_1 = require("../../../../Alchemi/Defender/libs/clients/src");
let TokenService = class TokenService {
    constructor(jwtHelperService) {
        this.jwtHelperService = jwtHelperService;
        this.$authenticationSubject = new rxjs_1.Subject();
        this.$tokenBeSubject = new rxjs_1.BehaviorSubject(new token_dto_1.TokenDto());
        if (!this.$tokenBeSubject.value.accessToken) {
            const localStorageAuthTokenStr = localStorage.getItem('authToken');
            const token = JSON.parse(localStorageAuthTokenStr);
            this.$tokenBeSubject.next(token);
            this.$authenticationSubject.next(null);
        }
    }
    get isTokenAvailable() {
        if (!this.token) {
            return false;
        }
        return this.token.accessToken != null;
    }
    get isAdmin() {
        const roles = this.getRoles();
        return _.some(roles, r => r === clients_1.UserRoleEnum.admin);
    }
    get isUser() {
        const roles = this.getRoles();
        return _.some(roles, r => r === clients_1.UserRoleEnum.user);
    }
    get decodedToken() {
        if (this.isTokenAvailable) {
            return this.jwtHelperService.decodeToken(this.token.accessToken);
        }
        return null;
    }
    get token() {
        return this.$tokenBeSubject.value;
    }
    set token(token) {
        localStorage.setItem('authToken', JSON.stringify(token));
        this.$tokenBeSubject.next(token);
    }
    get isAuthenticated() {
        return this.isTokenAvailable;
    }
    get sid() {
        if (!this.decodedToken) {
            return null;
        }
        return this.decodedToken['userid'];
    }
    getRoles() {
        if (!this.decodedToken) {
            return null;
        }
        const data = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return _.toLower(data).split(',');
    }
    resetAccessToken() {
        localStorage.removeItem('authToken');
        this.token = null;
    }
};
TokenService = tslib_1.__decorate([
    (0, core_1.Injectable)({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [angular_jwt_1.JwtHelperService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map