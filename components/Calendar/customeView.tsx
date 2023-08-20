import { useSelector } from 'react-redux';
import { Card, Text, Container } from '@mantine/core';
import { format } from 'date-fns';

const CustomView = (prop) => {
  console.log('props', prop);
 const filteredEvents = Object.values(prop.eventStore.defs)
  .filter(event => event.groupId !== "")
  .map(event => event.extendedProps.result);
  console.log(filteredEvents);
  // Render the events from all months together
  // Customize this component to meet your specific requirements
   return (
 <Container padding="15px">
      <Text size="lg" weight={500} style={{ marginBottom: '16px' }}>
        Leave Request Summary
      </Text>
      {filteredEvents.map((event) => (
        <Card
          key={event.ID}
          shadow="xs"
          padding="sm"
          radius="md"
            style={{ marginBottom: '16px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%)', fontFamily: 'monospace' }}
          hover
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text size="lg" weight={500} style={{ marginRight: '8px', width: '18ch' }}>
              {event.HolidaySummary}
            </Text>
        <Text size="sm" style={{ marginRight: '8px', width: '11ch' }}>
              {format(new Date(event.leavePeriodStart), 'yyyy-MMM-d')}
            </Text>
            <Text size="sm" style={{ marginRight: '8px' }}>
              to
            </Text>
            <Text size="sm" style={{ marginRight: '8px', width: '13ch' }}>
              {format(new Date(event.leavePeriodEnd), 'yyyy-MMM-d')}
            </Text>
        <Text size="sm" color="blue" weight={700}>
              (No of days: {event.leaveDays})
            </Text>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default CustomView;
