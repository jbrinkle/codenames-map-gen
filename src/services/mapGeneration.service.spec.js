
import { generateMap, MapGenerationError, serializeMapAndSettings, deserializeMapAndSettings } from './mapGeneration.service';

describe('Map generation', () => {

  it('standard board generation works', () => {
    // arrange
    const inputParams = {
      dimensions: {
        width: 5,
        height: 4
      },
      team: {
        count: 2,
        first: 2
      },
      bystandersCount: 6,
      assassinsCount: 1
    }

    // act
    const map = generateMap(inputParams);

    // assert
    expect(map.dimensions).toEqual(inputParams.dimensions);
    expect(map.team).toEqual(inputParams.team);
    expect(map.data).toBeTruthy();
    expect(map.data.length).toBe(inputParams.dimensions.height)
    expect(map.data[0].length).toBe(inputParams.dimensions.width);

    const data = map.data.map(r => r.join('')).join('').split('');
    expect(data.filter(c => c === 'a').length).toBe(1);
    expect(data.filter(c => c === 'b').length).toBe(6);
    expect(data.filter(c => c === '2').length).toBe(7);
    expect(data.filter(c => c === '1').length).toBe(6);
  })

  it('duet board generation works', () => {
    // arrange
    const inputParams = {
      dimensions: {
        width: 4,
        height: 3
      },
      team: {
        count: 1,
        first: 1
      },
      bystandersCount: 5,
      assassinsCount: 1
    }

    // act
    const map = generateMap(inputParams);

    // assert
    expect(map.dimensions).toEqual(inputParams.dimensions);
    expect(map.team).toEqual(inputParams.team);
    expect(map.data).toBeTruthy();
    expect(map.data.length).toBe(inputParams.dimensions.height)
    expect(map.data[0].length).toBe(inputParams.dimensions.width);

    const data = map.data.map(r => r.join('')).join('').split('');
    expect(data.filter(c => c === 'a').length).toBe(1);
    expect(data.filter(c => c === 'b').length).toBe(5);
    expect(data.filter(c => c === '1').length).toBe(6);
  })

  it('throws when dimensions out of bounds', () => {
    // arrange
    const inputParams = {
      dimensions: {
        width: 2,
        height: 3
      },
      team: {
        count: 2,
        first: 1
      },
      bystandersCount: 5,
      assassinsCount: 1
    }

    // act / assert
    expect(() => generateMap(inputParams)).toThrow(MapGenerationError);
    expect(() => generateMap(inputParams)).toThrow(/Board\sdim/);
  })

  it('throws when even number of agents in 2-team mode', () => {
    // arrange
    const inputParams = {
      dimensions: {
        width: 5,
        height: 5
      },
      team: {
        count: 2,
        first: 1
      },
      bystandersCount: 8,
      assassinsCount: 1
    }

    // act / assert
    expect(() => generateMap(inputParams)).toThrow(MapGenerationError);
    expect(() => generateMap(inputParams)).toThrow(/odd/);
  })

});

describe('Serialization', () => {
  it('serializes standard into v1 format', () => {
    // arrange
    const generated = {
      dimensions: {
        width: 3,
        height: 3
      },
      team: {
        count: 2,
        first: 2
      },
      bystandersCount: 3,
      assassinsCount: 1,
      data: [ ['a','b','b'], ['b','1','1'], ['2','2','2'] ]
    }

    // act
    const serialized = serializeMapAndSettings(generated);

    // assert
    expect(serialized).toBe('00133220301abbb11222');
  })

  it('serializes duet into v1 format', () => {
    // arrange
    const generated = {
      dimensions: {
        width: 3,
        height: 3
      },
      team: {
        count: 1,
        first: 1
      },
      bystandersCount: 3,
      assassinsCount: 1,
      data: [ ['a','b','b'], ['b','1','1'], ['1','1','1'] ]
    }

    // act
    const serialized = serializeMapAndSettings(generated);

    // assert
    expect(serialized).toBe('00133110301abbb11111');
  })

  it('deserialization of v1 format', () => {
    // arrange
    const serialized = '00133220301abbb11222';

    // act
    const deserialized = deserializeMapAndSettings(serialized);

    // assert
    expect(deserialized).toEqual({
      dimensions: {
        width: 3,
        height: 3
      },
      team: {
        count: 2,
        first: 2
      },
      bystandersCount: 3,
      assassinsCount: 1,
      data: [ ['a','b','b'], ['b','1','1'], ['2','2','2'] ]
    })
  })
})