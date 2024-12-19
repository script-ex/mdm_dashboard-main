export interface IMDMSession {
  id: string;
  userId: string;
  status: "IN-PROGRESS" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
  sessionObject: object;
  reportName: string;
  sharedWithUsers: {
    userId: string;
    role: "VIEWER" | "EDITOR";
    sharedAt?: Date;
  }[];
  reportPdf?: {
    bucket: string;
    key: string;
    sessionHash: string;
    generatedAt: Date;
  };
}
