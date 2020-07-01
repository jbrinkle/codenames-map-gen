
//////////////============MAP GENERATION
/*
Map Generation Input Parameters
  {
    dimensions: {
      width: 5,
      height: 5
    },
    team: {
      count: 2,
      first: 1
    },
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

function validateMapInputParams(params) {
  if (!params) {
    throw new MapGenerationError('No params provided');
  }
  if (!params.dimensions || !params.dimensions.width || !params.dimensions.height) {
    throw new MapGenerationError('Board dimensions must be provided')
  }
  if (params.dimensions.width < 3 || params.dimensions.width > 8 ||
      params.dimensions.height < 3 || params.dimensions.height > 8) {
      throw new MapGenerationError('Board dimensions must both be in range [3, 8]')
    }
  if (!params.team || !params.team.count || !params.team.first) {
    throw new MapGenerationError('Team information must be provided (ie team count and who is first)')
  }
  if (params.team.count < 1 || params.team.count > 2 || params.team.first < 1 || params.team.first > 2) {
    throw new MapGenerationError('Team information should only refer to team 1 or team 2')
  }
  if (!params.bystandersCount || params.bystandersCount < 0) {
    throw new MapGenerationError('Bystanders must be present and >= 0')
  }
  if (!params.assassinsCount || params.assassinsCount < 0) {
    throw new MapGenerationError('Assassins must be present and >= 0')
  }
  const totalCellCount = params.dimensions.width * params.dimensions.height;
  if (params.bystandersCount >= totalCellCount || params.assassinsCount >= totalCellCount) {
    throw new MapGenerationError('Assassins and Bystanders should not number greater than the board size')
  }
  if (params.team.count === 2 &&
     (totalCellCount - params.bystandersCount - params.assassinsCount) % 2 === 0) {
    throw new MapGenerationError('Wrong number of agents. Expected an odd number of agents.')
  }
}

export function generateMap(mapGenParams) {
  validateMapInputParams(mapGenParams);

  const totalBoardCellCount = mapGenParams.dimensions.width * mapGenParams.dimensions.height;
  let totalAgentCount = totalBoardCellCount;

  // create buckets to draw from randomly
  const buckets = {};
  if (mapGenParams.assassinsCount > 0) {
    buckets['a'] = mapGenParams.assassinsCount;
    totalAgentCount -= mapGenParams.assassinsCount;
  }
  if (mapGenParams.bystandersCount > 0) {
    buckets['b'] = mapGenParams.bystandersCount;
    totalAgentCount -= mapGenParams.bystandersCount;
  }
  if (mapGenParams.team.count > 1) {
    const perTeam = Math.floor(totalAgentCount / 2);
    buckets['1'] = perTeam + (mapGenParams.team.first === 1 ? 1 : 0);
    buckets['2'] = perTeam + (mapGenParams.team.first === 2 ? 1 : 0);
  } else {
    buckets['1'] = totalAgentCount;
  }

  // build the board map
  const boardData = Array(mapGenParams.dimensions.height);
  let r = 0, c = 0;
  let bucketNames = Object.keys(buckets);
  while (r < mapGenParams.dimensions.height && bucketNames.length) {
    const bucketIndex = Math.floor(Math.random() * bucketNames.length);
    const bucketName = bucketNames[bucketIndex];

    if (!boardData[r]) { boardData[r] = Array(mapGenParams.dimensions.width); }

    boardData[r][c] = bucketName;

    if (buckets[bucketName] === 1) {
      delete buckets[bucketName];
    } else {
      buckets[bucketName]--;
    }
    bucketNames = Object.keys(buckets);

    if (++c >= mapGenParams.dimensions.width) {
      ++r;
      c = 0;
    }
  }

  return {
    ...mapGenParams,
    data: boardData
  }
}

//////////////============SERIALIZATION

export function serializeMapAndSettings(config) {
  let serialized = '001';

  serialized = serialized.concat(config.dimensions.width, config.dimensions.height);
  serialized = serialized.concat(config.team.count, config.team.first);
  serialized = serialized.concat(config.bystandersCount.toString().padStart(2, '0'));
  serialized = serialized.concat(config.assassinsCount.toString().padStart(2, '0'));

  const compressedData = config.data.map(row => row.join('')).join('');
  serialized = serialized.concat(compressedData);

  return serialized;
}

export function deserializeMapAndSettings(serialized) {
  let deserialized = {
    dimensions: {
      width: parseInt(serialized.slice(3, 4)),
      height: parseInt(serialized.slice(4, 5))
    },
    team: {
      count: parseInt(serialized.slice(5, 6)),
      first: parseInt(serialized.slice(6, 7))
    },
    bystandersCount: parseInt(serialized.slice(7, 9)),
    assassinsCount: parseInt(serialized.slice(9, 11)),
  };

  const data = serialized.slice(11).split('');
  const dataArr = [];
  let row = data.splice(0, deserialized.dimensions.width);
  while (row.length && dataArr.length <= deserialized.dimensions.height) {
    dataArr.push(row);
    row = data.splice(0, deserialized.dimensions.width);
  }

  deserialized['data'] = dataArr;

  return deserialized;
}

export default {
    generateMap,
    serializeMapAndSettings,
    deserializeMapAndSettings
};