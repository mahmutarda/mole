let currMoleTile; // Şu anda görünen "mole" (kuyruklu kemirgen) karosu
let currPlantTile; // Şu anda görünen "plant" (bitki) karosu
let score = 0; // Oyuncunun skoru
let gameOver = false; // Oyunun devam edip etmediği

window.onload = function() {
    setGame(); // Sayfa yüklendiğinde oyunu başlat
}

function setGame() {
    for (let i = 0; i < 9; i++) { // 9 karo oluştur
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile); // Karoya tıklama dinleyicisi ekle
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // Her 1 saniyede bir "mole" (kuyruklu kemirgen) görünmesini ayarla
    setInterval(setPlant, 2000); // Her 2 saniyede bir "plant" (bitki) görünmesini ayarla
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9); // 0 ile 8 arasında rastgele bir sayı al
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = ""; // Eğer bir önceki mole varsa temizle
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) { // Eğer bitkiyle aynı karo seçildiyse, görünmeyi erteleyin
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = ""; // Eğer bir önceki bitki varsa temizle
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) { // Eğer mole ile aynı karo seçildiyse, görünmeyi erteleyin
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if (gameOver) {
        return;
    }
    if (this == currMoleTile){ // Eğer tıklanan karo mole ise
        score += 10; // Skoru 10 artır
        document.getElementById("score").innerText = score.toString(); // Skoru güncelle
    } else if (this == currPlantTile){ // Eğer tıklanan karo bitki ise
        document.getElementById("score").innerText = "  GAME OVER " + score.toString(); // Skoru ekrana yaz ve oyunu bitir
        gameOver = true; // Oyunu bitir bayrağını işaretle
    }
}
