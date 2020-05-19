const key = 'd3d0823fdc554c60b2b1c1cacd3190a6';
const date = dateFns.format(new Date(), 'YYYYMMDD');

const getTrain = async (trainID) => {
    const base = 'http://newtrain.market.alicloudapi.com/ai_travel/train_info/search_train_id_time/v1';
    const query =  `?DATE=${date}&TRAIN_NUM=${trainID}`;

    const response = await fetch(base + query, {headers: {'Authorization':`APPCODE ${key}`}});
    const data = await response.json();

    console.log(data.火车列车车次时刻实体信息);
    return data.火车列车车次时刻实体信息;
};




