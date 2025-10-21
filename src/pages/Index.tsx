import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PHONE_NUMBER = '+74999299999';
const AUTO_CALL_DELAY = 1500;

export default function Index() {
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `tel:${PHONE_NUMBER}`;
    }, AUTO_CALL_DELAY);

    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
    }, AUTO_CALL_DELAY + 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(connectTimer);
    };
  }, []);

  const handleManualCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#0a2b50] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <img 
            src="https://vodochet.ru/assets/cache_image/img/company/logo_psg_240x0_818.png" 
            alt="ПСГ — Проект Сервис Групп" 
            className="w-32 h-auto"
          />
        </div>

        <div className="relative mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse-ring">
            <Icon name="Phone" className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 tracking-tight">
          {isConnecting ? 'Соединяем с оператором ПСГ...' : 'Готово к звонку'}
        </h1>

        <p className="text-lg text-white/80 text-center mb-8 max-w-md">
          {isConnecting 
            ? 'Автоматический вызов начнётся через мгновение' 
            : 'Если звонок не начался автоматически, нажмите кнопку ниже'}
        </p>

        <Button
          onClick={handleManualCall}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 gap-3"
        >
          <Icon name="Phone" className="w-6 h-6" />
          Позвонить оператору по заявке
        </Button>

        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm mb-2">Телефон службы поддержки:</p>
          <a 
            href={`tel:${PHONE_NUMBER}`}
            className="text-white/90 text-lg font-semibold hover:text-primary transition-colors"
          >
            +7 (499) 929-99-99
          </a>
        </div>
      </div>

      <footer className="absolute bottom-6 text-white/40 text-sm">
        © {new Date().getFullYear()} ПСГ — Проект Сервис Групп
      </footer>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j=0;j<document.scripts.length;j++){
                if (document.scripts[j].src===r){return;}
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(12345678, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `,
        }}
      />
    </div>
  );
}