export interface FeatureInfo {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // SVG is now a React component
    feature: string;
    description: string;
}
