
import { generateMap, MapGenerationError, serializeMap, deserializeMap } from './mapGeneration.service';

describe('Map generation', () => {

  it('standard board generation works', () => {
    // arrange
    const inputParams = {
      teamCount: 2,
      team1AgentsCount: 9,
      team2AgentsCount: 8,
      boardWidth: 5,
      boardHeight: 5,
      bystandersCount: 7,
      assassinsCount: 1
    }

    // act
    const map = generateMap(inputParams);

    // assert
    expect(map.firstTurn).toBe('1');
    expect(map.data.filter(x => x === 'a').length).toBe(1);
    expect(map.data.filter(x => x === 'b').length).toBe(7);
    expect(map.data.filter(x => x === '1').length).toBe(9);
    expect(map.data.filter(x => x === '2').length).toBe(8);
  })

  it('duet board generation works', () => {
    // arrange
    const inputParams = {
      teamCount: 1,
      team1AgentsCount: 9,
      boardWidth: 4,
      boardHeight: 4,
      bystandersCount: 5,
      assassinsCount: 2
    }

    // act
    const map = generateMap(inputParams);

    // assert
    expect(map.firstTurn).toBe('1');
    expect(map.data.filter(x => x === 'a').length).toBe(2);
    expect(map.data.filter(x => x === 'b').length).toBe(5);
    expect(map.data.filter(x => x === '1').length).toBe(9);
    expect(map.data.filter(x => x === '2').length).toBe(0);
  })

  it('throws when counts do not match up', () => {
    // arrange
    const inputParams = {
      teamCount: 1,
      team1AgentsCount: 9,
      boardWidth: 5,
      boardHeight: 4,
      bystandersCount: 5,
      assassinsCount: 2
    }

    // act / assert
    expect(() => generateMap(inputParams)).toThrow(MapGenerationError);
    expect(() => generateMap(inputParams)).toThrow(/board\ssize/);
  })

});

describe('Serialization', () => {
  it('serializes standard into v1 format', () => {
    // arrange
    const generatedMap = {
      teamCount: 2,
      team1AgentsCount: 8,
      team2AgentsCount: 9,
      boardWidth: 5,
      boardHeight: 5,
      bystandersCount: 7,
      assassinsCount: 1,
      firstTurn: '2',
      data: 'abbbbbbb11111111122222222'.split()
    }

    // act
    const serialized = serializeMap(generatedMap);

    // assert
    expect(serialized).toBe('001552080907012abbbbbbb11111111122222222');
  })

  it('serializes duet into v1 format', () => {
    // arrange
    const generatedMap = {
      teamCount: 1,
      team1AgentsCount: 9,
      boardWidth: 4,
      boardHeight: 4,
      bystandersCount: 5,
      assassinsCount: 2,
      firstTurn: '1',
      data: 'aabbbbb111111111'.split()
    }

    // act
    const serialized = serializeMap(generatedMap);

    // assert
    expect(serialized).toBe('001441090005021aabbbbb111111111');
  })

  it('deserialization of v1 format', () => {
    // arrange
    const serialized = '001441090005021aabbbbb111111111';

    // act
    const deserialized = deserializeMap(serialized);

    // assert
    expect(deserialized).toEqual({
      teamCount: 1,
      team1AgentsCount: 9,
      boardWidth: 4,
      boardHeight: 4,
      bystandersCount: 5,
      assassinsCount: 2,
      firstTurn: '1',
      data: 'aabbbbb111111111'.split()
    })
  })
})