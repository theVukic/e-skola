import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="E-Škola | Početna">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Kontrolna tabla
              </Link>
            ) : (
              <>
                <Link
                  href={login()}
                  className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                  Prijava
                </Link>
                <Link
                  href={register()}
                  className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                  Registracija
                </Link>
              </>
            )}
          </nav>
        </header>

        <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-700 lg:grow starting:opacity-0">
          <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
            <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0_0_0_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:shadow-[inset_0_0_0_1px_#fffaed2d]">
              <h1 className="mb-1 font-medium">Dobrodišli</h1>
              <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                E-Škola je jednostavna i brza platforma za školsku administraciju.
                <br />
                Funkcionalnosti aplikacije: 
              </p>

              <ul className="mb-4 flex flex-col lg:mb-6">
                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                    </span>
                    </span>
                    <span>
                    Upravljanje <strong>studentima</strong> i njihovim podacima
                    </span>
                </li>

                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                    </span>
                    </span>
                    <span>
                    Organizacija i pregled <strong>kurseva</strong>
                    </span>
                </li>

                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                    </span>
                    </span>
                    <span>
                    Evidencija <strong>profesora</strong> i predmeta
                    </span>
                </li>

                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow dark:border-[#3E3E3A] dark:bg-[#161615]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                    </span>
                    </span>
                    <span>
                    Praćenje <strong>upisa</strong> i statusa učenika
                    </span>
                </li>
                </ul>



              {!auth.user ? (
                <div className="flex gap-3 text-sm leading-normal">
                  <Link
                    href={login()}
                    className="inline-block rounded-sm bg-[#1b1b18] px-5 py-1.5 text-white hover:opacity-90 dark:bg-[#EDEDEC] dark:text-[#1b1b18]"
                  >
                    Prijava
                  </Link>
                  <Link
                    href={register()}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                  >
                    Registracija
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3 text-sm leading-normal">
                  <Link
                    href={dashboard()}
                    className="inline-block rounded-sm bg-[#1b1b18] px-5 py-1.5 text-white hover:opacity-90 dark:bg-[#EDEDEC] dark:text-[#1b1b18]"
                  >
                    Otvori kontrolnu tablu
                  </Link>
                </div>
              )}
            </div>

            <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fafafa] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#141414]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-40 w-40 rotate-12 rounded-xl border border-[#e3e3e0] dark:border-[#2d2d2b]" />
                <div className="absolute h-24 w-24 -rotate-6 rounded-full border border-[#e3e3e0] dark:border-[#2d2d2b]" />
              </div>
              <div className="absolute inset-0 rounded-t-lg shadow-[inset_0_0_0_1px_rgba(26,26,0,0.12)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0_0_0_1px_#2a2a29]" />
            </div>
          </main>
        </div>

        <div className="hidden h-14.5 lg:block" />
      </div>
    </>
  );
}

