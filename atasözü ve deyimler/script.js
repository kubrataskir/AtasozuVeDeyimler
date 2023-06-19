/*fetch('https://sozluk.gov.tr/atasozu')
.then(gelen=>gelen.json())
.then(veri=>console.log(veri))//gelen için geleni json a çevir.veri çekme komutu .
*/

//Birden fazlaişlemin aynı anda çalışmasını sağlayan asenkron fonksyon
//Giriş ve çıkış için kullanacağımız HTML nesnelerini değişkenlere alalım.
//Çağırırken kısa yol olması için const şeklinde tanımladık. Çağırırken sonuc vs diyeceğiz.
//girenler çıkanlar neler 

const sonuc = document.getElementById("sonuc");
const aramaKutusu = document.getElementById("aramaKutusu");
const aramaListesi = document.getElementById("aramaListesi");

//JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturduk.

const anahtarKelimeler = [];
const deyimlerSozler = [];

verileriYukle();//fonksiyonu çağırdık
//fetch ile sunucuya bağlandık.
async function verileriYukle() {//fonksiyonun işlevini belirttik.{ içerisinede yapacağı işlemleri yazdık.}
    const sunucuYaniti = await fetch('https://sozluk.gov.tr/atasozu');//await sunucu yanıtını beklemek
    let veriler = await sunucuYaniti.json();//json ile verileri çek
    //console.log(veriler);

    veriler.forEach(eleman => {  //verilerin içerisinde gezmeyi sağlar.
        anahtarKelimeler.push(eleman.anahtar);
        deyimlerSozler.push(eleman.sozum);
    });

    //tekrarlı kelimeleri teke düşürmek için;
    const birlesmisKelimeler = [...new Set(anahtarKelimeler)];
    //console.log(birlesmisKelimeler);

    birlesmisKelimeler.sort(() => Math.random() - 0.5);//eleman sırasını değiştiriyor
    let sayac = 0;
    birlesmisKelimeler.forEach(kelime => {
        if (sayac < 5) {//5 öneri sunsun.
            const yeniOneri = document.createElement("option");
            aramaListesi.appendChild(yeniOneri);
            yeniOneri.value = kelime;
        }
        sayac++;
    })
}

aramaKutusu.addEventListener("input", (e) => sonuclariFiltrele(e.target.value));

function sonuclariFiltrele(arananKelime){
    sonuc.innerHTML="";
    const aramaKriteri=new RegExp(arananKelime,"gi");//büyük küçük harf ayırmadan her veriyi getirmeyi sağlar gi.
    let eslesenler=deyimlerSozler.filter(soz=>aramaKriteri.test(soz));//arama kriterindeki her bir sözü test et.
    
    if(arananKelime.length<3){//burada 3 karakterden az bir kelime yazılırsa gerekli gereksiz tüm sonuçlar görünmemsi sağlandı.
        eslesenler=[];
    }
    //console.log(eslesenler);//istediğimizi veriyor mu kontrol ederiz.
    eslesenler.forEach(es=>{
        const siradakiSonuc=document.createElement("li");//li nesnesi oluşturduk.
        sonuc.appendChild(siradakiSonuc);//yukarda oluşturduğumuz sonuc contunu yazdık.
        siradakiSonuc.innerHTML=es;
    })

}
