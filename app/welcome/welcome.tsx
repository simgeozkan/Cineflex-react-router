import React, { useEffect, useState } from "react";

function Welcome() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // localStorage'dan email'i hemen alıp bir değişkene ata
    const email = localStorage.getItem("userEmail");
    console.log("localStorage'dan okunan email:", email);

    // state'i güncelle
    setUserEmail(email);
  }, []);

  // userEmail state değiştiğinde logla (isteğe bağlı)
  useEffect(() => {
    console.log("userEmail state güncellendi:", userEmail);
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            {/* Logo veya resim buraya */}
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center"></p>
            <ul>
              <li className="self-stretch p-3 leading-normal">
                Hoşgeldin{userEmail ? `, ${userEmail}` : ""}!
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default Welcome;
