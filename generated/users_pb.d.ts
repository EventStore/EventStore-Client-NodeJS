// package: event_store.client.users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): CreateReq.Options | undefined;
    setOptions(value?: CreateReq.Options): CreateReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateReq): CreateReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateReq;
    static deserializeBinaryFromReader(message: CreateReq, reader: jspb.BinaryReader): CreateReq;
}

export namespace CreateReq {
    export type AsObject = {
        options?: CreateReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;
        getPassword(): string;
        setPassword(value: string): Options;
        getFullName(): string;
        setFullName(value: string): Options;
        clearGroupsList(): void;
        getGroupsList(): Array<string>;
        setGroupsList(value: Array<string>): Options;
        addGroups(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
            password: string,
            fullName: string,
            groupsList: Array<string>,
        }
    }

}

export class CreateResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateResp.AsObject;
    static toObject(includeInstance: boolean, msg: CreateResp): CreateResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateResp;
    static deserializeBinaryFromReader(message: CreateResp, reader: jspb.BinaryReader): CreateResp;
}

export namespace CreateResp {
    export type AsObject = {
    }
}

export class UpdateReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): UpdateReq.Options | undefined;
    setOptions(value?: UpdateReq.Options): UpdateReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateReq.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateReq): UpdateReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateReq;
    static deserializeBinaryFromReader(message: UpdateReq, reader: jspb.BinaryReader): UpdateReq;
}

export namespace UpdateReq {
    export type AsObject = {
        options?: UpdateReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;
        getPassword(): string;
        setPassword(value: string): Options;
        getFullName(): string;
        setFullName(value: string): Options;
        clearGroupsList(): void;
        getGroupsList(): Array<string>;
        setGroupsList(value: Array<string>): Options;
        addGroups(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
            password: string,
            fullName: string,
            groupsList: Array<string>,
        }
    }

}

export class UpdateResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateResp): UpdateResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateResp;
    static deserializeBinaryFromReader(message: UpdateResp, reader: jspb.BinaryReader): UpdateResp;
}

export namespace UpdateResp {
    export type AsObject = {
    }
}

export class DeleteReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): DeleteReq.Options | undefined;
    setOptions(value?: DeleteReq.Options): DeleteReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteReq.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteReq): DeleteReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteReq;
    static deserializeBinaryFromReader(message: DeleteReq, reader: jspb.BinaryReader): DeleteReq;
}

export namespace DeleteReq {
    export type AsObject = {
        options?: DeleteReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
        }
    }

}

export class DeleteResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteResp): DeleteResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteResp;
    static deserializeBinaryFromReader(message: DeleteResp, reader: jspb.BinaryReader): DeleteResp;
}

export namespace DeleteResp {
    export type AsObject = {
    }
}

export class EnableReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): EnableReq.Options | undefined;
    setOptions(value?: EnableReq.Options): EnableReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EnableReq.AsObject;
    static toObject(includeInstance: boolean, msg: EnableReq): EnableReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EnableReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EnableReq;
    static deserializeBinaryFromReader(message: EnableReq, reader: jspb.BinaryReader): EnableReq;
}

export namespace EnableReq {
    export type AsObject = {
        options?: EnableReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
        }
    }

}

export class EnableResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EnableResp.AsObject;
    static toObject(includeInstance: boolean, msg: EnableResp): EnableResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EnableResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EnableResp;
    static deserializeBinaryFromReader(message: EnableResp, reader: jspb.BinaryReader): EnableResp;
}

export namespace EnableResp {
    export type AsObject = {
    }
}

export class DisableReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): DisableReq.Options | undefined;
    setOptions(value?: DisableReq.Options): DisableReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableReq.AsObject;
    static toObject(includeInstance: boolean, msg: DisableReq): DisableReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableReq;
    static deserializeBinaryFromReader(message: DisableReq, reader: jspb.BinaryReader): DisableReq;
}

export namespace DisableReq {
    export type AsObject = {
        options?: DisableReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
        }
    }

}

export class DisableResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableResp.AsObject;
    static toObject(includeInstance: boolean, msg: DisableResp): DisableResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableResp;
    static deserializeBinaryFromReader(message: DisableResp, reader: jspb.BinaryReader): DisableResp;
}

export namespace DisableResp {
    export type AsObject = {
    }
}

export class DetailsReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): DetailsReq.Options | undefined;
    setOptions(value?: DetailsReq.Options): DetailsReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetailsReq.AsObject;
    static toObject(includeInstance: boolean, msg: DetailsReq): DetailsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetailsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetailsReq;
    static deserializeBinaryFromReader(message: DetailsReq, reader: jspb.BinaryReader): DetailsReq;
}

export namespace DetailsReq {
    export type AsObject = {
        options?: DetailsReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
        }
    }

}

export class DetailsResp extends jspb.Message { 

    hasUserDetails(): boolean;
    clearUserDetails(): void;
    getUserDetails(): DetailsResp.UserDetails | undefined;
    setUserDetails(value?: DetailsResp.UserDetails): DetailsResp;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetailsResp.AsObject;
    static toObject(includeInstance: boolean, msg: DetailsResp): DetailsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetailsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetailsResp;
    static deserializeBinaryFromReader(message: DetailsResp, reader: jspb.BinaryReader): DetailsResp;
}

export namespace DetailsResp {
    export type AsObject = {
        userDetails?: DetailsResp.UserDetails.AsObject,
    }


    export class UserDetails extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): UserDetails;
        getFullName(): string;
        setFullName(value: string): UserDetails;
        clearGroupsList(): void;
        getGroupsList(): Array<string>;
        setGroupsList(value: Array<string>): UserDetails;
        addGroups(value: string, index?: number): string;

        hasLastUpdated(): boolean;
        clearLastUpdated(): void;
        getLastUpdated(): DetailsResp.UserDetails.DateTime | undefined;
        setLastUpdated(value?: DetailsResp.UserDetails.DateTime): UserDetails;
        getDisabled(): boolean;
        setDisabled(value: boolean): UserDetails;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): UserDetails.AsObject;
        static toObject(includeInstance: boolean, msg: UserDetails): UserDetails.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: UserDetails, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): UserDetails;
        static deserializeBinaryFromReader(message: UserDetails, reader: jspb.BinaryReader): UserDetails;
    }

    export namespace UserDetails {
        export type AsObject = {
            loginName: string,
            fullName: string,
            groupsList: Array<string>,
            lastUpdated?: DetailsResp.UserDetails.DateTime.AsObject,
            disabled: boolean,
        }


        export class DateTime extends jspb.Message { 
            getTicksSinceEpoch(): string;
            setTicksSinceEpoch(value: string): DateTime;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): DateTime.AsObject;
            static toObject(includeInstance: boolean, msg: DateTime): DateTime.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: DateTime, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): DateTime;
            static deserializeBinaryFromReader(message: DateTime, reader: jspb.BinaryReader): DateTime;
        }

        export namespace DateTime {
            export type AsObject = {
                ticksSinceEpoch: string,
            }
        }

    }

}

export class ChangePasswordReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ChangePasswordReq.Options | undefined;
    setOptions(value?: ChangePasswordReq.Options): ChangePasswordReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePasswordReq.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePasswordReq): ChangePasswordReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePasswordReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePasswordReq;
    static deserializeBinaryFromReader(message: ChangePasswordReq, reader: jspb.BinaryReader): ChangePasswordReq;
}

export namespace ChangePasswordReq {
    export type AsObject = {
        options?: ChangePasswordReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;
        getCurrentPassword(): string;
        setCurrentPassword(value: string): Options;
        getNewPassword(): string;
        setNewPassword(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
            currentPassword: string,
            newPassword: string,
        }
    }

}

export class ChangePasswordResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePasswordResp.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePasswordResp): ChangePasswordResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePasswordResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePasswordResp;
    static deserializeBinaryFromReader(message: ChangePasswordResp, reader: jspb.BinaryReader): ChangePasswordResp;
}

export namespace ChangePasswordResp {
    export type AsObject = {
    }
}

export class ResetPasswordReq extends jspb.Message { 

    hasOptions(): boolean;
    clearOptions(): void;
    getOptions(): ResetPasswordReq.Options | undefined;
    setOptions(value?: ResetPasswordReq.Options): ResetPasswordReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetPasswordReq.AsObject;
    static toObject(includeInstance: boolean, msg: ResetPasswordReq): ResetPasswordReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetPasswordReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetPasswordReq;
    static deserializeBinaryFromReader(message: ResetPasswordReq, reader: jspb.BinaryReader): ResetPasswordReq;
}

export namespace ResetPasswordReq {
    export type AsObject = {
        options?: ResetPasswordReq.Options.AsObject,
    }


    export class Options extends jspb.Message { 
        getLoginName(): string;
        setLoginName(value: string): Options;
        getNewPassword(): string;
        setNewPassword(value: string): Options;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Options.AsObject;
        static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Options;
        static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
    }

    export namespace Options {
        export type AsObject = {
            loginName: string,
            newPassword: string,
        }
    }

}

export class ResetPasswordResp extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetPasswordResp.AsObject;
    static toObject(includeInstance: boolean, msg: ResetPasswordResp): ResetPasswordResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetPasswordResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetPasswordResp;
    static deserializeBinaryFromReader(message: ResetPasswordResp, reader: jspb.BinaryReader): ResetPasswordResp;
}

export namespace ResetPasswordResp {
    export type AsObject = {
    }
}
