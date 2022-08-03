import { PromiseWithChild } from 'child_process';

type Exec = {
  stdout: string;
  stderr: string;
};

export type AsyncExec = PromiseWithChild<Exec>;
