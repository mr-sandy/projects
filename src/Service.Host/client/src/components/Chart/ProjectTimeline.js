import React from 'react';
import { TableHeaders } from './TableHeaders';
import { statuses } from '../../constants';
import { statusColours } from '../utility';

const settings = {
    viewWidth: 1000,
    viewHeight: 80,
    strokeWidth: 2.5,
    markerHeight: 60,
    markerWidth: 40
};

class Marker extends React.Component {
    render() {
        const { cx, phase, status = statuses.COMPLETE } = this.props;

        const topY = (settings.viewHeight - settings.markerHeight) / 2;
        const middleY = settings.viewHeight / 2;
        const bottomY = (settings.viewHeight + settings.markerHeight) / 2;

        const leftX = cx - settings.markerWidth / 2;
        const middleX = cx;
        const rightX = cx + settings.markerWidth / 2;

        const points = `${leftX},${middleY} ${middleX},${topY} ${rightX},${middleY} ${middleX},${bottomY}`;

        return (
            <React.Fragment>
                <polygon points={points} stroke="#333" fill={statusColours[status]} />
                <text x={middleX} y={middleY} style={{ fontSize: '20px', transform: 'translate(-6px, 6px)' }}>{phase}</text>
            </React.Fragment>
        );
    }
}


class ProjectTimeline extends React.Component {
    render() {
        const { months, project } = this.props;

        const totalDays = months.reduce((total, month) => total + month.daysInMonth, 0);
        const monthsWithPositions = months.reduce((soFar, month) => {
            if (soFar) {
                const previous = soFar[soFar.length - 1];
                return [
                    ...soFar,
                    {
                        ...month,
                        start: previous.start + previous.width,
                        width: month.daysInMonth / totalDays
                    }
                ];

            } else {
                return [{ start: 0, width: month.daysInMonth / totalDays, month: month.month }];
            }
        }, null);

        return (
            <svg viewBox={`0 0 ${settings.viewWidth} ${settings.viewHeight}`} strokeWidth={settings.strokeWidth} >
                {monthsWithPositions.map(month => {
                    return (
                        <rect
                            key={`${month.month}-${month.year}`}
                            x={month.start * settings.viewWidth}
                            width={month.width * settings.viewWidth}
                            height={settings.viewHeight}
                            style={{ fill: month.month % 2 === 0 ? '#fafafa' : '#eeeeee' }} />
                    );
                })}

                {project.phases.map(phase => {
                    const phase0Start = phase.phase === 0 &&
                        phase.timeline.overall.start !== null &&
                        phase.timeline.overall.start >= 0 &&
                        phase.timeline.overall.start <= 1
                        ? phase.timeline.overall.start * settings.viewWidth
                        : null;

                    const precedingPhase = project.phases.find(p => p.phase === phase.phase - 1);
                    const showPrecedingMarker = precedingPhase &&
                        phase0Start === null &&
                        phase.timeline.overall.start === 0;

                    const lineStart = phase.timeline.overall.start < 0
                        ? 0
                        : phase.timeline.overall.start * settings.viewWidth + settings.markerWidth / 2;

                    const lineEnd = phase.timeline.overall.end > 1
                        ? 1 * settings.viewWidth
                        : phase.timeline.overall.end * settings.viewWidth - settings.markerWidth / 2;

                    const markerPosition = phase.timeline.overall.end > 1
                        ? null
                        : phase.timeline.overall.end;

                    return (
                        <React.Fragment key={phase.phase}>
                            {phase0Start !== null && <Marker cx={phase0Start} />}
                            {showPrecedingMarker && precedingPhase && <Marker cx={0} phase={precedingPhase.phase} status={precedingPhase.status} />}
                            {lineStart < lineEnd && <line x1={lineStart} y1={settings.viewHeight / 2} x2={lineEnd} y2={settings.viewHeight / 2} stroke="#333" />}
                            {markerPosition !== null && <Marker cx={markerPosition * settings.viewWidth} phase={phase.phase} status={phase.status} />}
                        </React.Fragment>
                    )
                })}
            </svg>
        );
    }
}

export default ProjectTimeline;