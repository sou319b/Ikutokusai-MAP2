// データ定義
const areas = [
  { 
    id: "①", 
    name: "K3号館", 
    coords: [0.25, 0.36, 0.35, 0.50], 
    info: [
      {
        floor: "3階",
        rooms: [
          { number: "3301", name: "プログラミング実習室" },
          { number: "3303", name: "デザイン工房" }
        ]
      },
      {
        floor: "4階",
        rooms: [
          { number: "3401", name: "AI研究ラボ" },
          { number: "3403", name: "ロボティクス実験室" }
        ]
      }
    ],
    description: "K3号館は、最新のテクノロジーを学ぶための施設です。プログラミングやAI、ロボティクスなど、先端技術の教育と研究が行われています。"
  },
  { 
    id: "②", 
    name: "図書館", 
    coords: [0.15, 0.40, 0.225, 0.52], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "101", name: "一般図書エリア" },
          { number: "102", name: "閲覧室" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "専門書エリア" },
          { number: "202", name: "グループ学習室" }
        ]
      }
    ],
    description: "図書館は24時間開館しており、豊富な蔵書と快適な学習環境を提供しています。一般図書から専門書まで幅広い分野の本を取り揃えています。"
  },
  { 
    id: "③", 
    name: "体育館", 
    coords: [0.375, 0.30, 0.475, 0.42], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "メインアリーナ", name: "バスケットボールコート" },
          { number: "サブアリーナ", name: "卓球場" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "フィットネスルーム" },
          { number: "202", name: "ダンススタジオ" }
        ]
      }
    ],
    description: "体育館は様々なスポーツ活動に対応した多目的施設です。メインアリーナでの大会開催や、各種運動部の練習に利用されています。"
  },
  { 
    id: "④", 
    name: "学生会館", 
    coords: [0.50, 0.10, 0.6875, 0.30], 
    info: [
      {
        floor: "1階",
        rooms: [
          { number: "101", name: "学生ラウンジ" },
          { number: "102", name: "カフェテリア" }
        ]
      },
      {
        floor: "2階",
        rooms: [
          { number: "201", name: "サークル活動室" },
          { number: "202", name: "多目的ホール" }
        ]
      }
    ],
    description: "学生会館は学生生活の中心となる施設です。休憩やグループワーク、サークル活動など、様々な用途に利用されています。"
  },
];

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = 'p-4 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg';
  document.body.appendChild(container);

  // タイトル
  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center text-gray-800';
  title.textContent = 'インタラクティブ学園祭マップ';
  container.appendChild(title);

  // マップコンテナ
  const mapContainer = document.createElement('div');
  mapContainer.className = 'relative inline-block rounded-lg overflow-hidden shadow-xl w-full';
  container.appendChild(mapContainer);

  // マップ画像
  const mapImage = document.createElement('img');
  mapImage.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/facility_map-ccL63FThoLb2qr0S9oq4rLh9NaN5hU.jpg';
  mapImage.alt = '学園祭マップ';
  mapImage.className = 'w-full h-auto';
  mapContainer.appendChild(mapImage);

  // SVGオーバーレイ
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'absolute top-0 left-0 w-full h-full');
  svg.setAttribute('aria-hidden', 'true');
  mapContainer.appendChild(svg);

  // エリアマーカーの作成
  areas.forEach(area => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'cursor-pointer');
    g.addEventListener('click', () => showAreaInfo(area));

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', `${((area.coords[0] + area.coords[2]) / 2) * 100}%`);
    circle.setAttribute('cy', `${((area.coords[1] + area.coords[3]) / 2) * 100}%`);
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', 'rgba(59, 130, 246, 0.8)');
    circle.setAttribute('class', 'transition-all duration-200 hover:fill-opacity-100');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', `${((area.coords[0] + area.coords[2]) / 2) * 100}%`);
    text.setAttribute('y', `${((area.coords[1] + area.coords[3]) / 2) * 100}%`);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '24');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('class', 'pointer-events-none');
    text.textContent = area.id;

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);
  });

  // 施設一覧カード
  const facilitiesCard = createCard('施設一覧');
  container.appendChild(facilitiesCard);

  const facilitiesList = document.createElement('ul');
  facilitiesList.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
  facilitiesCard.querySelector('.card-content').appendChild(facilitiesList);

  areas.forEach(area => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center space-x-2';
    listItem.innerHTML = `
      <span class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        ${area.id}
      </span>
      <span class="text-gray-700">${area.name}</span>
    `;
    facilitiesList.appendChild(listItem);
  });

  // エリア情報表示関数
  function showAreaInfo(area) {
    // 既存のエリア情報カードを削除
    const existingCard = document.querySelector('.area-info-card');
    if (existingCard) {
      existingCard.remove();
    }

    const card = createCard(`${area.id} ${area.name}`);
    card.className += ' area-info-card mt-6';
    container.insertBefore(card, facilitiesCard);

    const cardContent = card.querySelector('.card-content');

    const description = document.createElement('p');
    description.className = 'mb-4 text-gray-700';
    description.textContent = area.description;
    cardContent.appendChild(description);

    const table = document.createElement('table');
    table.className = 'min-w-full divide-y divide-gray-200';
    table.innerHTML = `
      <thead>
        <tr>
          <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">階</th>
          <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部屋番号</th>
          <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      </tbody>
    `;

    const tableBody = table.querySelector('tbody');
    area.info.forEach(floor => {
      floor.rooms.forEach((room, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          ${index === 0 ? `<td rowspan="${floor.rooms.length}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${floor.floor}</td>` : ''}
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.number}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.name}</td>
        `;
        tableBody.appendChild(row);
      });
    });

    cardContent.appendChild(table);
  }

  // カード作成ヘルパー関数
  function createCard(title) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow rounded-lg mt-6';
    card.innerHTML = `
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">${title}</h3>
      </div>
      <div class="px-4 py-5 sm:p-6 card-content"></div>
    `;
    return card;
  }
});