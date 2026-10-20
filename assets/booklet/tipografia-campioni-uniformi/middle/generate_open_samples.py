from pathlib import Path
import hashlib
import importlib.util
import json


DIRECTORY = Path(__file__).resolve().parent
GENERATOR = DIRECTORY.parent / "early/generate_samples.py"


def main():
    specification = importlib.util.spec_from_file_location("sample_generator", GENERATOR)
    generator = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(generator)
    generator.OUTPUT_DIRECTORY = Path("assets/booklet/tipografia-campioni-uniformi/middle")
    sources = [
        ("roboto-regular", "Roboto-VF.ttf", "Roboto", "Regular", "roboto", {"wdth": 100, "wght": 400}, "Roboto"),
        ("alegreya-sans-regular", "AlegreyaSans-Regular.ttf", "Alegreya Sans", "Regular", "alegreyasans", None, "AlegreyaSans"),
        ("quicksand-regular", "Quicksand-VF.ttf", "Quicksand Light", "Regular", "quicksand", {"wght": 400}, "Quicksand"),
    ]
    samples = []
    inline = {}
    for slug, filename, family, style, upstream, location, prefix in sources:
        source = {"slug": slug, "path": str(DIRECTORY / "originali" / filename), "family": family, "style": style, "reference": "https://github.com/google/fonts/tree/main/ofl/" + upstream, "license": "SIL Open Font License 1.1", "licensePath": str(DIRECTORY / "originali" / (prefix + "-OFL.txt")), "metadataPath": str(DIRECTORY / "originali" / (prefix + "-METADATA.pb")), "fontBinaryCopied": True}
        if location:
            source["location"] = location
        artifact, metadata = generator.make_sample(source)
        if slug == "quicksand-regular":
            artifact["content"] = artifact["content"].replace("Quicksand Light Regular", "Quicksand Regular")
            metadata["font"] = "Quicksand"
            metadata["style"] = "Regular at wght400"
            metadata["outputSha256"] = hashlib.sha256(artifact["content"].encode()).hexdigest()
        Path(artifact["path"]).write_text(artifact["content"])
        samples.append(metadata)
        inline[slug] = artifact["content"]
    (DIRECTORY / "open-samples-manifest.json").write_text(json.dumps({"target": {"text": "Aag", "fontSize": 36, "baseline": 31.2, "bandHeight": 54, "fill": "#30323a"}, "samples": samples}, indent=2) + "\n")
    print(json.dumps(inline))


if __name__ == "__main__":
    main()
