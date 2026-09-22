import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const CAL_NAMESPACE = '30min';
const CAL_LINK = 'kitebaze/30min';

export default function CalInlineEmbed() {
  useEffect(() => {
    (async function configureCalendar() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="h-[900px] overflow-hidden rounded-[22px] border border-kb-line-strong bg-kb-surface kb-card-shadow sm:h-[820px] lg:h-[680px]">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        }}
      />
    </div>
  );
}
