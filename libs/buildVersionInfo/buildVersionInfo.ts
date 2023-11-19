const exec = require("child_process").exec;
// const dayjs = require("dayjs");
const dateFns = require("date-fns");

type OptionsType = {
  name: string;
  version: string;
};

type GitType = {
  date: string;
  build: string;
  hash: string;
  branch: string;
};

type InfoType = {
  description?: string;
  version?: string;
  git: GitType;
};

export type VersionInfoType = Record<string, InfoType>;

function command(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      { cwd: __dirname },
      function (err: Error, stdout: string, stderr: string) {
        if (err || stderr) {
          reject(err || stderr);
          return;
        }

        resolve(stdout.split("\n").join(""));
      }
    );
  });
}

export function buildVersionInfo({ name, version, ...args }: OptionsType) {
  return new Promise((resolve, reject) => {
    Promise.all([
      command("git log -1 --pretty=%H\\;%h\\;%cd --date=iso HEAD"),
      command("git rev-parse --abbrev-ref HEAD"),
      command("git rev-list --count HEAD"),
    ]).then(([hashes, branch, build]: string[]) => {
      const [hash, datetime] = hashes.replace(/\\/gi, "").split(";");
      const date =
        dateFns.format(dateFns.parseISO(datetime), "yyyy-MM-dd HH:mm:ss") +
        " ZZ";

      resolve({
        [name]: {
          version,
          ...args,
          git: {
            date,
            build,
            hash,
            branch,
          },
        },
      });
    }, reject);
  });
}
