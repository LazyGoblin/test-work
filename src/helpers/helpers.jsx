const panStateHandler = (event) => {
    let snapshot = event.target.value;
    let controlled = snapshot.replace(/\D/g, "").slice(0, 16);

    setFormData({ ...formData, pan: controlled });
  };

  const expireStateHandler = (event) => {
    let snapshot = event.target.value;
    let controlled = snapshot.replace(/^(\d\d)(\d)/g, "$1/$2");

    setFormData({ ...formData, expire: controlled });
  };

  const holderStateHandler = (event) => {
    let snapshot = event.target.value;
    let uppSnap = snapshot.toUpperCase();
    let controlled = uppSnap.replace(/[^A-Za-z\s]/g, "");

    setFormData({ ...formData, holder: controlled });
  };

  const cvv2StateHandler = (event) => {
    const snapshot = event.target.value;

    if (/^\d*$/.test(snapshot)) {
      setFormData({ ...formData, cvv2: snapshot });
    }
  };