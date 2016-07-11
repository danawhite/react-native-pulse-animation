import React, { Component, PropTypes } from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class PulseAnimation extends Component {
    constructor(props) {
        superp(props);

        this.state = {
            started: false,
            top: props.top || 100,
            creationInterval: props.duration || 1000,
            updateInterval: props.updateInterval || 10,
            maxDiameter: props.diameter || 400,
            color: props.color || 'steelblue',
            pulseSize: 100,
            numPulses: props.numPulses || 3,
            pulses: [],
            pulseType: this.setPulseType(props.pulseType) // 'opaque' | 'vector'
        }
    }

    componentDidMount() {
        this.setState({
            started: true
        });

        this.state.numPulses.forEach(( pulse, index) => {
            setTimeout( () => {
                this.createPulse(pulse)
            }, index * this.state.creationInterval)
        });

        setInterval( () => {
            this.updatePulse()
        }, 10)
    }

    setPulseType(type) {

    }

    createPulse(index) {
        let pulses = this.state.pulses;

        let pulse = {
            pulseKey: pulses.length + 1,
            diameter: 0,
            opacity: .5
        };

        return [...pulses, pulse];
    }

    updatePulse() {
        let pulses = this.state.pulses.map((p, i) => {
            let maxDiameter = this.state.maxDiameter;
            let newDiameter = ( (p.diameter > maxDiameter) ? 0 : p.diameter + 2);
            let centerOffset = ( maxDiameter - newDiameter ) / 2;
            let opacity = Math.abs( ( newDiameter / this.state.maxDiameter ) - 1 );

            let pulse = {
                pulseKey: i + 1,
                diameter: newDiameter,
                opacity: (opacity > .5 ? .5 : opacity),
                centerOffset: centerOffset
            };

            return pulse;

        });

        this.setState({ pulses });
    }

    this.renderOutlinePulse() {
        this.state.pulses.map( pulse => {
            return (
                <View style={[styles.pulseContainer, {width: this.state.maxDiameter, height: this.state.maxDiameter}]}>
                    {this.state.pulses.map((pulse) => {
                        return (
                            <View key={pulse.pulseKey}
                                  style={[styles.pulse, {
                                         backgroundColor: this.state.color,
                                         width: pulse.diameter,
                                         height: pulse.diameter,
                                         opacity: pulse.opacity,
                                         borderRadius: pulse.diameter / 2,
                                         left: pulse.left,
                                         borderColor:
                                         top: pulse.centerOffset,
                                         left: pulse.centerOffset
                                         } ]}>
                            </View>
                        )
                    })}
                </View>
            )
        })
    }

    renderDefaultOutline() {
        return (
            <View style={[styles.container, {top: this.state.top}]}>
                <View style={[styles.pulseContainer, {width: this.state.maxDiameter, height: this.state.maxDiameter}]}>
                    {this.state.pulses.map((pulse) => {
                        return (
                            <View key={pulse.pulseKey}
                                  style={[styles.pulse, {
                                         backgroundColor: this.state.color,
                                         width: pulse.diameter,
                                         height: pulse.diameter,
                                         opacity: pulse.opacity,
                                         borderRadius: pulse.diameter / 2,
                                         left: pulse.left,
                                         borderColor:
                                         top: pulse.centerOffset,
                                         left: pulse.centerOffset
                                         } ]}>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    render() {
        if(this.state.started){
            {this.state.pulseType === 'vector' ? this.renderOutlinePulse() : this.renderDefaultPulse()}
        } else {
            return (
                <View style={styles.container}>
                </View>
            );
        }
    }
}

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    pulse: {
        position: 'absolute',
        flex: 1
    }
};


PulseAnimation.propTypes = {};

