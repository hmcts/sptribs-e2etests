const waUsers_content = {
  userRoleAdmin: "waHearingCentreAdmin",
  userRoleCitizen: process.env.ENV_NAME === "demo" ? "demoCitizen" : "citizen",
  userRoleLO: "waSeniorCaseworker",
  userRoleJudge: "waPresidentOfTribunal",
  userRoleCaseWorker: "waCaseWorker",
} as const;

export default waUsers_content;
