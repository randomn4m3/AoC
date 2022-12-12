import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import * as mathjs from "https://esm.sh/mathjs@11.5.0";

const ITERATIONS = 10_000;
class Monkey {
  items: number[];
  operation: string;
  testNumber: number;
  trueThrowMoneyId: number;
  falseThrowMonkeyId: number;
  totalOperations: number;

  constructor(
    items: number[],
    operation: string,
    testNumber: number,
    trueThrowMoneyId: number,
    falseThrowMonkeyId: number,
  ) {
    this.items = items;
    this.operation = operation;
    this.testNumber = testNumber;
    this.trueThrowMoneyId = trueThrowMoneyId;
    this.falseThrowMonkeyId = falseThrowMonkeyId;
    this.totalOperations = 0;
  }

  addItem(item: number) {
    this.items.push(item);
  }

  // Nasty!
  // deno-lint-ignore no-unused-vars
  getNew(old: number) {
    return eval(this.operation);
  }

  inspect(monkeys: Monkey[], lcm: number): void {
    while (this.items.length) {
      const item = this.items.shift();
      this.totalOperations++;
      let newVal = this.getNew(item!);
      newVal %= lcm;
      if ((newVal % this.testNumber) === 0) {
        monkeys[this.trueThrowMoneyId].addItem(newVal);
      } else monkeys[this.falseThrowMonkeyId].addItem(newVal);
    }
  }
}

function solution(input: string) {
  const monkeys: Monkey[] = [];
  const rows = input.split("\n\n");
  for (const monkey of rows) {
    const first = /Starting items: (.*)/g.exec(monkey);
    const second = /Operation: new = (.*)/g.exec(monkey);
    const third = /Test: divisible by (\d+)/g.exec(monkey);
    const forth = /If true: throw to monkey (\d+)/g.exec(monkey);
    const fifth = /If false: throw to monkey (\d+)/g.exec(monkey);
    const items = first![1].split(",").map((n) => parseInt(n, 10));
    const operation = second![1];
    const testNumber = parseInt(third![1], 10);
    const trueThrowMoneyId = parseInt(forth![1], 10);
    const falseThrowMonkeyId = parseInt(fifth![1], 10);

    monkeys.push(
      new Monkey(
        items,
        operation,
        testNumber,
        trueThrowMoneyId,
        falseThrowMonkeyId,
      ),
    );
  }
  const arr = monkeys.map((x) => x.testNumber);
  const lcm = mathjs.lcm(...arr);
  for (let i = 0; i < ITERATIONS; i++) {
    monkeys.forEach((m) => m.inspect(monkeys, lcm));
  }
  return monkeys.map((x) => x.totalOperations).sort((a, b) => b - a)
    .slice(0, 2).reduce((a, b) => a * b);
}

const sample = solution(await Deno.readTextFile("./sample.txt"));
console.log(`Result: ${sample}`);
assertEquals(sample, 2713310158);

const result = solution(await Deno.readTextFile("./input.txt"));
console.log(`Result: ${result}`);
