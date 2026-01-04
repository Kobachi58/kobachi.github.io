// 地域データ
const regionData = [
    {
        pref: "福岡県",
        cities: [
            { name: "福岡市", wards: ["博多区", "中央区", "東区", "西区", "南区", "城南区", "早良区"] },
            { name: "北九州市", wards: ["小倉北区", "小倉南区", "門司区", "若松区", "戸畑区", "八幡東区", "八幡西区"] }
        ]
    },
    {
        pref: "佐賀県",
        cities: [
            { name: "佐賀市", wards: [] },
            { name: "唐津市", wards: [] }
        ]
    },
    {
        pref: "熊本県",
        cities: [
            { name: "熊本市", wards: ["中央区", "東区", "西区", "南区", "北区"] }
        ]
    }
];

const prefSelect = document.getElementById('pref-select');
const citySelect = document.getElementById('city-select');
const wardSelect = document.getElementById('ward-select');

// 県の選択肢を作成
regionData.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.pref;
    opt.textContent = item.pref;
    prefSelect.appendChild(opt);
});

// 県が変更されたら市を更新
prefSelect.onchange = function () {
    citySelect.innerHTML = '<option value="">市を選択</option>';
    wardSelect.innerHTML = '<option value="">区を選択</option>';
    citySelect.disabled = true;
    wardSelect.disabled = true;

    if (this.value) {
        const selected = regionData.find(d => d.pref === this.value);
        selected.cities.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = c.name;
            citySelect.appendChild(opt);
        });
        citySelect.disabled = false;
    }
};

// 市が変更されたら区を更新
citySelect.onchange = function () {
    wardSelect.innerHTML = '<option value="">区を選択</option>';
    wardSelect.disabled = true;

    const selectedPref = regionData.find(d => d.pref === prefSelect.value);
    const selectedCity = selectedPref.cities.find(c => c.name === this.value);

    if (selectedCity && selectedCity.wards.length > 0) {
        selectedCity.wards.forEach(w => {
            const opt = document.createElement('option');
            opt.value = w;
            opt.textContent = w;
            wardSelect.appendChild(opt);
        });
        wardSelect.disabled = false;
    }
};

// script.js の検索ボタン部分
document.getElementById('search-btn').onclick = function () {
    // 選択されていない項目があるかチェック
    if (!prefSelect.value) {
        alert("県を選択してください");
        return;
    }

    // 押した瞬間にボタンを少し暗くする演出
    this.style.transform = "scale(0.95)";
    setTimeout(() => this.style.transform = "scale(1)", 100);

    alert(prefSelect.value + " " + citySelect.value + " " + wardSelect.value + " の求人を探します");
};