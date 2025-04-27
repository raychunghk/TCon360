import { Card, Container, Text } from '@mantine/core';
import { format } from 'date-fns';
// Define interfaces for your event structures
interface EventResult {
  eventType: string;
  ID: string;
  HolidaySummary: string;
  leavePeriodStart: string;
  leavePeriodEnd: string;
  leaveDays: number;
  [key: string]: any; // For any other properties
}

interface EventDef {
  groupId: string;
  extendedProps: {
    result: EventResult;
  };
  [key: string]: any; // For any other properties
}
export default function CustomView({ userStaff, ...props }) {
  console.log('user staff:', userStaff);
  console.log('props', props);

  const evtdef = props.eventStore.defs;

  const publicholidays = Object.values(evtdef)
    .filter(
      (event) => {
        // Type assertion to tell TypeScript what type 'event' is
        const typedEvent = event as EventDef;
        return (
          typedEvent.extendedProps?.result?.eventType === 'weekend' ||
          typedEvent.extendedProps?.result?.eventType === 'publicholiday'
        );
      }
    )
    .map((event) => (event as EventDef).extendedProps.result);
  console.log('public holidays?', publicholidays);
  const filteredEvents = Object.values(evtdef)
    .filter((event) => (event as EventDef).groupId !== '')
    .map((event) => (event as EventDef).extendedProps.result);
  console.log(filteredEvents);
  // Render the events from all months together
  // Customize this component to meet your specific requirements
  return (
    <Container p="15px">
      <Text size="lg" w={500} style={{ marginBottom: '16px' }}>
        Leave Request Summary
      </Text>
      {filteredEvents.map((event) => (
        <Card
          key={event.ID}
          shadow="xs"
          padding="sm"
          radius="md"
          style={{
            marginBottom: '16px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%)',
            fontFamily: 'monospace',
          }}

        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text
              size="lg"
              w={500}
              style={{ marginRight: '8px', width: '18ch' }}
            >
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
            <Text size="sm" color="blue" fw={700}>
              (No of days: {event.leaveDays})
            </Text>
          </div>
        </Card>
      ))}
    </Container>
  );
}
