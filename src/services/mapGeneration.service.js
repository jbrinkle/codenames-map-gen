
//////////////============MAP GENERATION
/*
Map Generation Input Parameters
{
    teamCount: 2,
    team1AgentsCount: 9,
    team2AgentsCount: 8,
    boardWidth: 5,
    boardHeight: 5,
    bystandersCount: 7,
    assassinsCount: 1
}
*/

export class MapGenerationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MapGenerationError';
  }
}

function validateMapInput(input) {
    if (!input) {
        throw new MapGenerationError('No input provided.');
    }
    Object.keys(input).forEach(k => {
      if (typeof input[k] !== 'number') {
        throw new MapGenerationError(`Property '${k}' was expected to be a number.`);
      }
    })
    // Team count
    if (!input.teamCount) {
        throw new MapGenerationError('Team count is a required property ("teamCount").');
    }
    if (input.teamCount < 1 || input.teamCount > 2) {
        throw new MapGenerationError('Team count must either be "1" or "2".');
    }
    // Agents
    if (input.teamCount >= 1) {
      if (!input.team1AgentsCount) {
        throw new MapGenerationError('Team 1 agent count is a required property ("team1AgentsCount")');
      }
      if (input.team1AgentsCount <= 0) {
        throw new MapGenerationError('Team 1 agent count must be greater than 0');
      }
    }
    if (input.teamCount >= 2) {
      if (!input.team2AgentsCount) {
        throw new MapGenerationError('Team 2 agent count is a required property ("team1AgentsCount")');
      }
      if (input.team2AgentsCount <= 0) {
        throw new MapGenerationError('Team 2 agent count must be greater than 0');
      }
    }
    // Board width
    if (!input.boardWidth) {
        throw new MapGenerationError('Board width is a required property ("boardWidth").');
    }
    if (input.boardWidth < 3 || input.boardWidth > 8) {
        throw new MapGenerationError('Board width must be between 3 and 8 inclusive.');
    }
    // Board height
    if (!input.boardHeight) {
        throw new MapGenerationError('Board height is a required property ("boardHeight").');
    }
    if (input.boardHeight < 3 || input.boardHeight > 8) {
        throw new MapGenerationError('Board height must be between 3 and 8 inclusive.');
    }
    // Bystander Count
    if (!input.bystandersCount) {
        throw new MapGenerationError('Bystander count is a required property ("bystandersCount").');
    }
    if (input.bystandersCount < 0) {
      throw new MapGenerationError('Bystander count must be >= 0.');
    }
    // Assassin Count
    if (!input.assassinsCount) {
        throw new MapGenerationError('Assassin count is a required property ("assassinsCount")');
    }
    if (input.assassinsCount < 0) {
      throw new MapGenerationError('Assassin count must be >= 0.');
    }
    // sum of pieces
    if (input.team1AgentsCount + (input.team2AgentsCount || 0) + input.bystandersCount + input.assassinsCount !== input.boardWidth * input.boardHeight) {
      throw new MapGenerationError('"Piece" counts do not equal board size.');
    }
}

export function generateMap(mapGenParams) {
    validateMapInput(mapGenParams);

    const buckets = {};
    buckets['1'] = mapGenParams.team1AgentsCount;
    if (mapGenParams.teamCount > 1) { buckets['2'] = mapGenParams.team2AgentsCount; }
    if (mapGenParams.bystandersCount > 0) { buckets['b'] = mapGenParams.bystandersCount; }
    if (mapGenParams.assassinsCount > 0) { buckets['a'] = mapGenParams.assassinsCount; }
    
    const boardData = [];
    do {
      const bucketNames = Object.keys(buckets);
      const bucketIndex = Math.floor(Math.random() * bucketNames.length);
      const bucketName = bucketNames[bucketIndex];

      boardData.push(bucketName);

      if (buckets[bucketName] === 1) {
        delete buckets[bucketName];
      } else {
        buckets[bucketName]--;
      }
    } while (boardData.length < mapGenParams.boardWidth * mapGenParams.boardHeight);

    return {
      ...mapGenParams,
      data: boardData,
      firstTurn: (mapGenParams.teamCount > 1 && mapGenParams.team2AgentsCount > mapGenParams.team1AgentsCount) ? '2' : '1'
    }
}

//////////////============SERIALIZATION

export function serializeMap(map) {
  let serialized = '001';

  serialized = serialized.concat(map.boardWidth, map.boardHeight, map.teamCount);
  serialized = serialized.concat(map.team1AgentsCount.toString().padStart(2, '0'));
  serialized = serialized.concat(map.teamCount > 1 ? map.team2AgentsCount.toString().padStart(2, '0') : '00');
  serialized = serialized.concat(map.bystandersCount.toString().padStart(2, '0'));
  serialized = serialized.concat(map.assassinsCount.toString().padStart(2, '0'));
  serialized = serialized.concat(map.firstTurn, map.data.join());

  return serialized;
}

export function deserializeMap(serializedMap) {
  let deserialized = {};

  deserialized['boardWidth'] = parseInt(serializedMap.slice(3, 4))
  deserialized['boardHeight'] = parseInt(serializedMap.slice(4, 5))
  deserialized['teamCount'] = parseInt(serializedMap.slice(5, 6))
  deserialized['team1AgentsCount'] = parseInt(serializedMap.slice(6, 8))
  if (deserialized.teamCount > 1) {
    deserialized['team2AgentsCount'] = parseInt(serializedMap.slice(8, 10))
  }
  deserialized['bystandersCount'] = parseInt(serializedMap.slice(10, 12))
  deserialized['assassinsCount'] = parseInt(serializedMap.slice(12, 14))
  deserialized['firstTurn'] = serializedMap.slice(14, 15)
  deserialized['data'] = serializedMap.slice(15).split()

  return deserialized;
}

export default {
    generateMap,
    serializeMap,
    deserializeMap
};