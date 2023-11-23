import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Calendar } from "react-native-calendars";

const GroupCalendarView = ({
  group,
  selected,
  setSelected,
  showselectDialog,
  showcheckDialog,
  datesmarked,
}) => {
  const [transformedDatesMarked, setTransformedDatesMarked] = useState({});
  useEffect(() => {
    const updatedates = () => {
      setTransformedDatesMarked(
        Object.fromEntries(
          Object.entries(datesmarked).map(([date, { dots, ...rest }]) => {
            if (dots && dots.length > 0) {
              return [
                date,
                {
                  ...rest,
                  dots: [
                    { key: dots[0], color: "green", selectedDotColor: "blue" },
                  ],
                },
              ];
            }
            return [date, { ...rest, dots: [] }];
          })
        )
      );
    };
    console.log("in calendar view", datesmarked);
    if (datesmarked) {
      updatedates();
    }
    console.log(transformedDatesMarked);
  }, [datesmarked]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
        }}>
        <Text variant='titleLarge'>Calendar</Text>
        <Button
          mode='contained'
          disabled={selected === ""}
          onPress={() => {
            {
              !group.datemarked
                ? showselectDialog(selected)
                : showcheckDialog();
            }
          }}>
          Add Activity
        </Button>
      </View>
      <View>
        <Calendar
          onDayPress={(day) => {
            console.log("CLICKED DAY", day);
            setSelected(day.dateString);
          }}
          markingType={"multi-dot"}
          markedDates={{
            ...transformedDatesMarked,
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
    </View>
  );
};

export default GroupCalendarView;
