"""System diagrams for the README, drawn with the official AWS icons.

Regenerate both PNGs from the repo root. Only Docker is needed:

  docker run --rm -v "$PWD/docs/diagrams:/work" -w /work python:3.12-slim sh -c \
    "apt-get update -qq && apt-get install -y -qq --no-install-recommends graphviz fonts-dejavu-core >/dev/null \
     && pip install -q --root-user-action=ignore diagrams==0.25.1 && python architecture.py"

Keep the labels in line with ADR-007 (request path) and ADR-008 (deploy path).
"""
from diagrams import Cluster, Diagram, Edge, Node
from diagrams.aws.network import CloudFront, Route53
from diagrams.aws.security import ACM, IAMRole
from diagrams.aws.storage import S3
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.client import User, Users
from diagrams.onprem.vcs import Github

GRAPH = {"bgcolor": "white", "pad": "0.4", "splines": "spline", "nodesep": "0.7", "ranksep": "1.1",
         "fontsize": "22", "fontname": "DejaVu Sans", "dpi": "144"}
NODE = {"fontname": "DejaVu Sans", "fontsize": "12"}
EDGE = {"fontname": "DejaVu Sans", "fontsize": "11", "color": "#555555"}


def external(label):
    """A service outside AWS, with no icon in the library: a labelled dashed box."""
    return Node(label, shape="box", style="rounded,dashed", width="2.2", height="0.9", labelloc="c")


with Diagram("How a visit is served", filename="request-path", show=False, direction="LR",
             graph_attr=GRAPH, node_attr=NODE, edge_attr=EDGE):
    visitors = Users("Visitors")

    with Cluster("GetStrength's AWS account"):
        cdn = CloudFront("CloudFront\n+ viewer-request function")
        cert = ACM("ACM certificate\nus-east-1 (at launch)")
        bucket = S3("Private S3 bucket\nap-southeast-2")
        dns = Route53("Route 53\ngetstrength.com\n(at launch)")

    email = external("Google Workspace\nthe gym's email")
    signup = external("Debit Success\nmembership signup")

    cdn >> Edge(label="TLS", style="dotted", arrowhead="none") >> cert
    visitors >> Edge(label="HTTPS") >> cdn >> Edge(label="Origin Access Control") >> bucket
    visitors >> Edge(label="DNS lookup", style="dashed") >> dns
    dns >> Edge(label="MX, SPF, DKIM, DMARC", style="dashed") >> email
    visitors >> Edge(label="Join", style="dashed") >> signup


with Diagram("How a change reaches the site", filename="deploy-pipeline", show=False, direction="LR",
             graph_attr=GRAPH, node_attr=NODE, edge_attr=EDGE):
    dev = User("Developer")

    with Cluster("GitHub"):
        pr = Github("Pull request\n1 approval")
        deploy = GithubActions("Deploy preview workflow\nnpm ci, preview build,\nupload, invalidate")

    with Cluster("GetStrength's AWS account"):
        role = IAMRole("Deploy role\ntrusts main only")
        with Cluster("Preview"):
            preview_bucket = S3("Preview bucket")
            preview_cdn = CloudFront("Preview distribution")
        with Cluster("Live (manual for now)"):
            live_bucket = S3("Live bucket")
            live_cdn = CloudFront("Live distribution")

    dev >> Edge(label="push a branch") >> pr >> Edge(label="merge to main\n(frontend/ or workflow changed)") >> deploy
    deploy >> Edge(label="assume role (OIDC)", style="dashed") >> role
    deploy >> Edge(label="s3 sync --delete") >> preview_bucket
    deploy >> Edge(label="invalidate /*") >> preview_cdn
    manual = {"style": "dashed", "color": "#c0392b", "fontcolor": "#c0392b"}
    dev >> Edge(label="SITE_ENV=production build,\nupload", **manual) >> live_bucket
    dev >> Edge(label="invalidate", **manual) >> live_cdn
