import { primaryColor } from "@/constants/theme";
import React, { FC, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  NumberProp,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import ThemedText from "../ui/ThemedText";

export interface DataPoint {
  label: string;  // Measurement for xlabel
  value?: number;
  showValue?: boolean;
}

export interface CWCInterface {
  dataList: DataPoint[];
  periodList: DataPoint[];
}

interface LineGraphProps {
  verticalData: DataPoint[];
  horizontalData: DataPoint[];
  padding?: number;
  yAxisWidth?: number;
  xAxisHeight?: number;
  strokeWidth?: number;
  lineColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showDots?: boolean;
  yTicks?: number;
  xTicks?: number;
}

const LineGraph: FC<LineGraphProps> = ({
  verticalData = [],
  horizontalData = [],
  padding = 12,
  yAxisWidth = 80,
  xAxisHeight = 28,
  strokeWidth = 3,
  lineColor = primaryColor[500],
  gradientFrom = primaryColor[500],
  gradientTo = primaryColor[900],
  showDots = true,
  yTicks = Math.min(verticalData.length, 4),
  xTicks = Math.min(horizontalData.length, 4),
}) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setSize({
      width,
      height,
    });
  };

const graph = useMemo(() => {
  const { width, height } = size;

  if (
    !verticalData.length ||
    !horizontalData.length ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  const chartLeft = yAxisWidth;
  const chartBottom = xAxisHeight;

  const chartWidth = Math.max(
    width - chartLeft - padding,
    1
  );

  const chartHeight = Math.max(
    height - padding * 2 - chartBottom,
    1
  );

  // ----------------------------------------
  // Data
  // ----------------------------------------

  const values = verticalData.map((d) =>
    Number(d.value)
  );

  const min = Math.min(...values);
  const max = Math.max(...values);

  const stepX =
    chartWidth / Math.max(values.length - 1, 1);

  const points = values.map((value, i) => {
    const x = chartLeft + i * stepX;

    const y =
      padding +
      (1 - (value - min) / (max - min || 1)) *
        chartHeight;

    return { x, y };
  });

  // ----------------------------------------
  // Paths
  // ----------------------------------------

  const linePath = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
    )
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${
      padding + chartHeight
    }
    L ${points[0].x} ${padding + chartHeight}
    Z
  `;

  return {
    width,
    height,
    points,
    linePath,
    areaPath,
    min,
    max,
    stepX,
    chartHeight,
    chartLeft,
    chartWidth,
  };
}, [
  verticalData,
  horizontalData,
  size,
  padding,
  yAxisWidth,
  xAxisHeight,
]);


  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
    >
      {graph ? (
        <Svg
          width={graph.width}
          height={graph.height}
        >
          <Defs>
            <LinearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <Stop
                offset="0%"
                stopColor={gradientFrom}
                stopOpacity={0.3}
              />
              <Stop
                offset="100%"
                stopColor={gradientTo}
                stopOpacity={0}
              />
            </LinearGradient>

            <LinearGradient
              id="lineGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <Stop
                offset="0%"
                stopColor={gradientFrom}
              />
              <Stop
                offset="100%"
                stopColor={gradientTo}
              />
            </LinearGradient>
          </Defs>

          {/* Y-axis labels */}
          {verticalData.map((item, i) => {
            const value = Number(item.value);

            const y =
              padding +
              (1 - (value - graph.min) / (graph.max - graph.min || 1)) *
                graph.chartHeight;

            return (
              <SvgText
                key={`y-${i}`}
                x={yAxisWidth - 8}
                y={y + 4}
                fontSize={10}
                fill={primaryColor[200]}
                opacity={0.6}
                textAnchor="end"
              >
                {`${value} ${item.label}`}
              </SvgText>
            );
          })}


          {/* Area */}
          <Path
            d={graph.areaPath}
            fill="url(#areaGradient)"
          />

          {/* Line */}
          <Path
            d={graph.linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {
          showDots &&
            graph.points.map(
              (
                p: {
                  x: NumberProp | undefined;
                  y: NumberProp | undefined;
                },
                i
              ) => (
                <Circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill={lineColor}
                />
              )
            )}

          {/* X-axis labels */}
          {horizontalData.map((item, i) => {
            const show =
              horizontalData.length <= 6 ||
              i % 2 === 0;

            if (!show) return null;

            return (
              <SvgText
                key={`x-${i}`}
                x={
                  graph.chartLeft +
                  i * graph.stepX
                }
                y={graph.height - 8}
                fontSize={10}
                fill={primaryColor[200]}
                opacity={0.6}
                textAnchor="middle"
              >
                {`${item.label}`}
              </SvgText>
            );
          })}
        </Svg>
      ) : (
        <View className="h-full w-full flex flex-row justify-center items-center">
          <ThemedText 
            label="Non ci sono dati sufficienti"  
            font="Nunito-Italic"
            darkModeDisabled
            textStyle="text-primary-500"
          />
        </View>
      )}
    </View>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

