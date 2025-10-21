import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PHONE_NUMBER = '+74999299999';
const AUTO_CALL_DELAY = 1500;
const METRIKA_COUNTER_ID = 104767901;

declare global {
  interface Window {
    ym: (counterId: number, action: string, target: string, params?: Record<string, unknown>) => void;
  }
}

export default function Index() {
  const [isConnecting, setIsConnecting] = useState(true);
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('psg_call_count');
    if (storedCount) {
      setCallCount(parseInt(storedCount, 10));
    }

    const timer = setTimeout(() => {
      trackCall('auto');
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

  const trackCall = (source: 'auto' | 'manual') => {
    const newCount = callCount + 1;
    setCallCount(newCount);
    localStorage.setItem('psg_call_count', newCount.toString());

    if (typeof window.ym !== 'undefined') {
      window.ym(METRIKA_COUNTER_ID, 'reachGoal', 'call_click', {
        source,
        phone: PHONE_NUMBER,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleManualCall = () => {
    trackCall('manual');
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#0a2b50] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <img 
            src="https://cdn.poehali.dev/files/7ebaf2cf-d3c3-40de-aa84-40854e185cae.jpg" 
            alt="ПСГ — Проект Сервис Групп" 
            className="w-40 h-auto"
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

        <div className="mt-8 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Clock" className="w-5 h-5 text-primary" />
            <p className="text-white/90 font-semibold">Заявки принимаются 24/7</p>
          </div>
          <p className="text-white/60 text-sm text-center">Наши операторы готовы помочь вам в любое время</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm mb-2">Телефон диспетчерской службы:</p>
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
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=104767901", "ym");

            ym(104767901, "init", {
                 ssr:true,
                 webvisor:true,
                 clickmap:true,
                 ecommerce:"dataLayer",
                 accurateTrackBounce:true,
                 trackLinks:true
            });
          `,
        }}
      />
    </div>
  );
}