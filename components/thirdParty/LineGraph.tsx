import { darkColor, primaryColor } from "@/constants/theme";
import React, { FC, useMemo, useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import ThemedText from "../ui/ThemedText";

export interface DataPoint {
  labelX?: string; // date (optional)
  value: number;   // numeric price
}
interface LineGraphProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  padding?: number;
  strokeWidth?: number;
  lineColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showDots?: boolean;
  yTicks?: number;
  priceFormatter?: (value: number) => string;
}

const LineGraph: FC<LineGraphProps> = ({
  data = [],
  width = 360,
  height = 200,
  padding = 36,
  strokeWidth = 3,
  lineColor = primaryColor[500],
  gradientFrom = primaryColor[500],
  gradientTo = primaryColor[900],
  showDots = true,
  yTicks = Math.min(data.length, 4),
  priceFormatter = (v) => `${Math.round(v)} €`,
}) => {

  // * State
  const [graphValid, setGraphValid] = useState<boolean>(false)

  // * Graphs variables
  const {
    points,
    linePath,
    areaPath,
    min,
    max,
    stepX,
    chartHeight,
  } = useMemo(() => {
    if(data.length) {
      setGraphValid(true)

      const values = data.map((d) => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
  
      const stepX = (width - padding * 2) / (data.length - 1 || 1);
      const chartHeight = height - padding * 2;
  
      const points = data.map((d, i) => {
        const x = padding + i * stepX;
        const y =
          padding +
          (1 - (d.value - min) / (max - min || 1)) * chartHeight;
  
        return { x, y };
      });
  
      const linePath = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
  
      const areaPath = `
        ${linePath}
        L ${points[points.length - 1].x} ${height - padding}
        L ${points[0].x} ${height - padding}
        Z
      `;
  
      return {
        points,
        linePath,
        areaPath,
        min,
        max,
        stepX,
        chartHeight,
      };
    }
    else {
      setGraphValid(false)
      return {
        points: [{x: 0, y: 0}],
        linePath: 0,
        areaPath: 0,
        min: 0,
        max: 0,
        stepX: 0,
        chartHeight: 0,
      };
    }
  }, [data, width, height, padding]);

  // * functions
  const showDotInfo = (e: GestureResponderEvent) => {

  }

  // * Display
  return (
    <View style={styles.container}>
      {
        graphValid ?
        <Svg width={width} height={height}>
          <Defs>
            {/* Gradient under the line */}
            <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={gradientFrom} stopOpacity={0.3} />
              <Stop offset="100%" stopColor={gradientTo} stopOpacity={0} />
            </LinearGradient>

            {/* Gradient stroke */}
            <LinearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor={gradientFrom} />
              <Stop offset="100%" stopColor={gradientTo} />
            </LinearGradient>
          </Defs>

          {/* Y-axis labels */}
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const value =
              min + ((max - min) / yTicks) * (yTicks - i);

            const y =
              padding + (chartHeight / yTicks) * i;

            return (
              <SvgText
                key={`y-${i}`}
                x={6}
                y={y + 4}
                fontSize={10}
                fill={primaryColor[200]}
                opacity={0.6}
              >
                {priceFormatter(value)}
              </SvgText>
            );
          })}

          {/* Area */}
          <Path d={areaPath as string} fill="url(#areaGradient)" />

          {/* Line */}
          <Path
            d={linePath as string}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {showDots &&
            points.map((p, i) => (
              <Circle
                onPress={(e) => showDotInfo(e)}
                key={i}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={lineColor}
              />
            ))}

          {/* X-axis labels (dates) */}
          {data.map((d, i) => {
            if (!d.labelX) return null;
            const show = data.length <= 6 || i % 2 === 0;
            if (!show) return null;

            return (
              <SvgText
                key={`x-${i}`}
                x={padding + i * stepX}
                y={height - 8}
                fontSize={10}
                fill={primaryColor[200]}
                opacity={0.6}
                textAnchor="middle"
              >
                {d.labelX}
              </SvgText>
            );
          })}
        </Svg>
        :
        <ThemedText label="Non ci sono dati sufficienti" />
      }
    </View>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkColor[900],
    borderRadius: 16,
    padding: 12,
  },
});
