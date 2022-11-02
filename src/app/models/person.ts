export interface IPerson {
  id: string;
  name: string;
}

export interface IVoter extends IPerson {
  hasVoted: boolean;
}

export interface ICandidate extends IPerson {
  votes: number;
}

export class Person implements IPerson {
  id: string;
  name: string;

  constructor(name: string) {
    // Not the perfect solution for unique id value but good enough for this purposes
    this.id = new Date().getTime().toString(16);
    this.name = name;
  }
}
export class Voter extends Person implements IVoter {
  hasVoted: boolean;

  constructor(name: string) {
    super(name);
    this.hasVoted = false;
  }
}

export class Candidate extends Person implements ICandidate {
  votes: number;

  constructor(name: string) {
    super(name);
    this.votes = 0;
  }
}
