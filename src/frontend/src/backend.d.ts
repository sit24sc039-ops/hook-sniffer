import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScanEntry {
    id: bigint;
    url: string;
    result: ScanResult;
    scanType: ScanType;
    timestamp: bigint;
    confidence: bigint;
}
export interface ProtectionSettingsPublic {
    aiIntel: boolean;
    silentScan: boolean;
    smsProtection: boolean;
    emailProtection: boolean;
    browserProtection: boolean;
}
export interface Stats {
    totalScanned: bigint;
    totalWarnings: bigint;
    totalBlocked: bigint;
}
export interface LinkedEmailPublic {
    provider: string;
    isLinked: boolean;
    emailAddress: string;
}
export interface LinkedPhonePublic {
    isLinked: boolean;
    phoneNumber: string;
}
export interface ThreatAlertPublic {
    id: bigint;
    url: string;
    source: ThreatSource;
    isRead: boolean;
    threatName: string;
    threatType: ThreatType;
    timestamp: bigint;
    riskScore: bigint;
}
export enum ScanResult {
    safe = "safe",
    spam = "spam",
    phishing = "phishing",
    malware = "malware"
}
export enum ScanType {
    qr = "qr",
    url = "url",
    email = "email"
}
export enum ThreatSource {
    qr = "qr",
    sms = "sms",
    url = "url",
    email = "email"
}
export enum ThreatType {
    spam = "spam",
    phishing = "phishing",
    malware = "malware"
}
export interface backendInterface {
    getAlerts(): Promise<Array<ThreatAlertPublic>>;
    getLinkedEmail(): Promise<LinkedEmailPublic>;
    getLinkedPhone(): Promise<LinkedPhonePublic>;
    getProtectionSettings(): Promise<ProtectionSettingsPublic>;
    getScanHistory(): Promise<Array<ScanEntry>>;
    getSecurityScore(): Promise<bigint>;
    getStats(): Promise<Stats>;
    getUnreadAlertsCount(): Promise<bigint>;
    linkEmail(provider: string, emailAddress: string): Promise<void>;
    linkPhone(phoneNumber: string): Promise<void>;
    markAlertRead(id: bigint): Promise<void>;
    markAllAlertsRead(): Promise<void>;
    scanEmail(url: string): Promise<ScanEntry>;
    scanQr(url: string): Promise<ScanEntry>;
    scanUrl(url: string): Promise<ScanEntry>;
    simulateEmailThreat(url: string, threatName: string): Promise<ThreatAlertPublic>;
    unlinkEmail(): Promise<void>;
    unlinkPhone(): Promise<void>;
    updateProtectionSettings(updated: ProtectionSettingsPublic): Promise<void>;
}
