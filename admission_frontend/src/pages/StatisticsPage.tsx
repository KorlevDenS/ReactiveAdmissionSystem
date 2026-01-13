import { useEffect, useState } from "react";
import { statsStream$ } from "../streams/statsStream";
import type { StatsResponse } from "../types/StatsResponse";

import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import styles from "./StatisticsPage.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export function StatisticsPage() {
    const [stats, setStats] = useState<StatsResponse | null>(null);

    useEffect(() => {
        const sub = statsStream$.subscribe(setStats);
        return () => sub.unsubscribe();
    }, []);

    if (!stats) return <div>Loading statistics...</div>;

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Reactive Statistics (push‑based)</h2>

            {/* 1. Total applicants */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>1. Total applicants</h3>
                <p className={styles.value}>{stats.totalApplicants}</p>
            </div>

            {/* 2. Applications by program */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>2. Applications by program</h3>

                <div className={styles.chartContainer}>
                    <Bar
                        height={260}
                        data={{
                            labels: Object.keys(stats.applicationsByProgram),
                            datasets: [
                                {
                                    label: "Applications",
                                    data: Object.values(stats.applicationsByProgram),
                                    backgroundColor: (ctx) => {
                                        const chart = ctx.chart;
                                        const { ctx: c, chartArea } = chart;

                                        // Пока chartArea не готов — возвращаем undefined (валидно для TS)
                                        if (!chartArea) return undefined;

                                        const gradient = c.createLinearGradient(0, 0, 0, chartArea.bottom);
                                        gradient.addColorStop(0, "#6366f1");
                                        gradient.addColorStop(1, "#06b6d4");

                                        return gradient as unknown as string;
                                    },

                                    borderRadius: 8,
                                    borderSkipped: false
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            animation: {
                                duration: 900,
                                easing: "easeOutQuart"
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        color: "#334155",
                                        font: {
                                            family: "Inter",
                                            size: 14,
                                            weight: 600
                                        },
                                        padding: 20,
                                        usePointStyle: true,
                                        pointStyle: "circle"
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: "#334155",
                                        font: { family: "Inter" }
                                    },
                                    grid: { display: false }
                                },
                                y: {
                                    ticks: {
                                        color: "#334155",
                                        font: { family: "Inter" }
                                    },
                                    grid: { color: "rgba(99,102,241,0.1)" }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* 3. Distribution by entrance test */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>3. Distribution by entrance test</h3>

                <div className={styles.pieContainer}>
                    <Pie
                        height={260}
                        data={{
                            labels: Object.keys(stats.applicationsByEntranceTest),
                            datasets: [
                                {
                                    data: Object.values(stats.applicationsByEntranceTest),
                                    backgroundColor: [
                                        "#6366f1",
                                        "#06b6d4",
                                        "#a855f7",
                                        "#3b82f6",
                                        "#facc15"
                                    ],
                                    borderWidth: 2,
                                    borderColor: "#ffffff"
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            animation: {
                                animateRotate: true,
                                animateScale: true,
                                duration: 1000,
                                easing: "easeOutQuart"
                            },
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        color: "#334155",
                                        font: {
                                            family: "Inter",
                                            size: 14,
                                            weight: 600
                                        },
                                        padding: 16,
                                        usePointStyle: true,
                                        pointStyle: "circle"
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* 4. Average score */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>4. Average score</h3>

                <p className={styles.value}>
                    Overall: {stats.averageScoreOverall.toFixed(2)}
                </p>

                <h4 className={styles.subTitle}>By entrance test:</h4>

                <div className={styles.chartContainer}>
                    <Line
                        height={260}
                        data={{
                            labels: Object.keys(stats.averageScoreByEntranceTest),
                            datasets: [
                                {
                                    label: "Average score",
                                    data: Object.values(stats.averageScoreByEntranceTest),
                                    borderColor: "#6366f1",
                                    backgroundColor: "rgba(99,102,241,0.25)",
                                    tension: 0.35,
                                    borderWidth: 3,
                                    pointRadius: 5,
                                    pointHoverRadius: 7,
                                    pointBackgroundColor: "#06b6d4",
                                    pointBorderColor: "#ffffff",
                                    pointBorderWidth: 2
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            animation: {
                                duration: 900,
                                easing: "easeOutQuart"
                            },
                            plugins: {
                                legend: {
                                    position: "top",
                                    labels: {
                                        color: "#334155",
                                        font: {
                                            family: "Inter",
                                            size: 14,
                                            weight: 600
                                        },
                                        padding: 20,
                                        usePointStyle: true,
                                        pointStyle: "circle"
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: "#334155",
                                        font: { family: "Inter" }
                                    },
                                    grid: { display: false }
                                },
                                y: {
                                    ticks: {
                                        color: "#334155",
                                        font: { family: "Inter" }
                                    },
                                    grid: { color: "rgba(99,102,241,0.1)" }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
