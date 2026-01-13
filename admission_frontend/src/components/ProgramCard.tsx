import styles from "./ProgramCard.module.css";
import type { EducationalProgram } from "../types/EducationalProgram";

export function ProgramCard({ program }: { program: EducationalProgram }) {
    return (
        <li className={styles.card}>
            <div className={styles.title}>{program.title}</div>

            {program.description && (
                <div className={styles.description}>{program.description}</div>
            )}

            <div className={styles.details}>
                <div className={`${styles.detailRow} ${styles.iconEducation}`}>
                    <strong>Education level</strong>
                    <span>{program.educationLevel}</span>
                </div>

                <div className={`${styles.detailRow} ${styles.iconBudget}`}>
                    <strong>Budget places</strong>
                    <span>{program.budgetPlacesNumber ?? "—"}</span>
                </div>

                <div className={`${styles.detailRow} ${styles.iconContract}`}>
                    <strong>Contract places</strong>
                    <span>{program.contractPlacesNumber ?? "—"}</span>
                </div>

                <div className={`${styles.detailRow} ${styles.iconCost}`}>
                    <strong>Contract cost</strong>
                    <span>{program.contractCost ? `${program.contractCost} ₽` : "—"}</span>
                </div>

                <div className={`${styles.detailRow} ${styles.iconScore}`}>
                    <strong>Minimum score</strong>
                    <span>{program.minimumPassingScore ?? "—"}</span>
                </div>
            </div>
        </li>
    );
}

