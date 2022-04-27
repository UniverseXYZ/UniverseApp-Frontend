// import './CreateNFT.scss';
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useSearchParam } from "react-use";
import { useAuthStore } from "src/stores/authStore";
import { useSignInPopupStore } from "src/stores/signInPopup";
import arrow from "../../../assets/images/arrow.svg";
import NFTCollectionForm from "./NFTCollectionForm";
// import './CreateNFT.scss';
import SingleNFTForm from "./SingleNFTForm";

const CreateNFT = () => {
  const router = useRouter();
  const accessToken = Cookies.get("xyz_access_token");

  const scrollContainer = useRef(null);

  const collectionAddress = useSearchParam("collection");
  const tabIndex = +useSearchParam("tabIndex");
  const NFTType = useSearchParam("nftType");
  const savedNFTID = useSearchParam("savedNft");

  const setShowNotAuthenticatedPopup = useSignInPopupStore(
    (s) => s.setShowNotAuthenticatedPopup
  );

  const isWalletConnected = useAuthStore((s) => s.isWalletConnected);

  const scrollToTop = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const goToCollectionPage = () => {
    if (collectionAddress) {
      router.push(`/collection/${collectionAddress}`);
    }
  };

  useEffect(() => {
    if (!accessToken && !isWalletConnected) {
      router.push("/minting");
      setShowNotAuthenticatedPopup(true);
    }
  }, [isWalletConnected]);

  return !accessToken && !isWalletConnected ? (
    <></>
  ) : (
    <div className="create--nft--page">
      <div className="create--nft--background" />
      <div className="create--nft--page--container">
        {collectionAddress ? (
          <div
            className="back-btn"
            onClick={goToCollectionPage}
            aria-hidden="true"
          >
            <img src={arrow} alt="back" style={{ marginRight: "6px" }} />
            {/*<span>{location.state?.collection?.name}</span>*/}
            Go Back
          </div>
        ) : (
          <div
            className="back-btn"
            onClick={() => router.back()}
            aria-hidden="true"
            ref={scrollContainer}
          >
            <img src={arrow} alt="back" style={{ marginRight: "6px" }} />
            <span>Go Back</span>
          </div>
        )}
        {!collectionAddress && !savedNFTID && (
          <h1 className="page--title">
            {tabIndex === 0 ||
            (tabIndex === 1 && NFTType === "single") ||
            (tabIndex === 1 && NFTType === "collection")
              ? "Create NFT"
              : "Create NFT collection"}
          </h1>
        )}
        {savedNFTID && (
          <h1 className="page--title" style={{ marginBottom: "20px" }}>
            Edit NFT
          </h1>
        )}
        {collectionAddress && NFTType === "collection" && (
          <h1 className="page--title">Edit collection</h1>
        )}
        <div className="tab__content">
          {tabIndex === 1 && NFTType === "single" && (
            <SingleNFTForm scrollToTop={scrollToTop} />
          )}
          {tabIndex === 1 && NFTType === "collection" && (
            <NFTCollectionForm scrollToTop={scrollToTop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
